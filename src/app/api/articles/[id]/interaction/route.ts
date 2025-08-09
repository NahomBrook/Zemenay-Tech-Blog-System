import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET: Get likes and comments for an article
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Check if article exists
    const article = await prisma.article.findUnique({
      where: { id: params.id },
      select: { id: true }
    });

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    const [comments, totalComments, likes] = await Promise.all([
      // Get top-level comments with reply counts
      prisma.comment.findMany({
        where: { articleId: params.id, parentId: null },
        include: {
          author: {
            select: { id: true, name: true, email: true, image: true }
          },
          _count: {
            select: { replies: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      // Get total comment count
      prisma.comment.count({ where: { articleId: params.id, parentId: null } }),
      // Get like count and check if current user liked
      prisma.like.count({ where: { articleId: params.id } })
    ]);

    // Check if current user liked the article
    const session = await getServerSession(authOptions);
    let userLiked = false;
    
    if (session?.user) {
      const like = await prisma.like.findFirst({
        where: {
          articleId: params.id,
          userId: session.user.id
        }
      });
      userLiked = !!like;
    }

    return NextResponse.json({
      likes: {
        count: likes,
        userLiked
      },
      comments: {
        data: comments,
        pagination: {
          total: totalComments,
          page,
          totalPages: Math.ceil(totalComments / limit),
          limit
        }
      }
    });

  } catch (error) {
    console.error('Error fetching interactions:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST: Handle like/unlike or add comment
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const { action, content, parentId } = data;

    // Check if article exists
    const article = await prisma.article.findUnique({
      where: { id: params.id },
      select: { id: true, published: true }
    });

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Handle like/unlike action
    if (action === 'like') {
      const existingLike = await prisma.like.findFirst({
        where: {
          articleId: params.id,
          userId: session.user.id
        }
      });

      if (existingLike) {
        // Unlike
        await prisma.like.delete({
          where: { id: existingLike.id }
        });
        return NextResponse.json({ liked: false });
      } else {
        // Like
        await prisma.like.create({
          data: {
            articleId: params.id,
            userId: session.user.id
          }
        });
        return NextResponse.json({ liked: true });
      }
    }
    // Handle comment action
    else if (action === 'comment' && content) {
      if (!article.published) {
        return NextResponse.json(
          { error: 'Cannot comment on unpublished articles' },
          { status: 400 }
        );
      }

      const comment = await prisma.comment.create({
        data: {
          content,
          articleId: params.id,
          authorId: session.user.id,
          parentId: parentId || null,
        },
        include: {
          author: {
            select: { id: true, name: true, email: true, image: true }
          },
          _count: {
            select: { replies: true }
          }
        }
      });

      return NextResponse.json(comment, { status: 201 });
    }
    
    return NextResponse.json(
      { error: 'Invalid action or missing parameters' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error handling interaction:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// DELETE: Delete a comment
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get('commentId');
    
    if (!commentId) {
      return NextResponse.json(
        { error: 'Comment ID is required' },
        { status: 400 }
      );
    }

    // Check if comment exists and belongs to user or user is admin
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { id: true, authorId: true, articleId: true }
    });

    if (!comment || comment.articleId !== params.id) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }

    // Check if user is the author or admin
    if (comment.authorId !== session.user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Delete the comment (replies will be deleted due to CASCADE)
    await prisma.comment.delete({
      where: { id: commentId }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
