import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: { id: true, name: true, email: true, image: true }
        },
        categories: true,
        tags: true,
        comments: {
          include: {
            author: {
              select: { id: true, name: true, email: true, image: true }
            },
            replies: {
              include: {
                author: {
                  select: { id: true, name: true, email: true, image: true }
                }
              },
              orderBy: { createdAt: 'asc' }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: { likes: true }
        }
      }
    });

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Increment view count
    if (article.published) {
      await prisma.article.update({
        where: { id: params.id },
        data: { views: { increment: 1 } }
      });
    }

    return NextResponse.json(article);

  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(
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
    
    // Check if article exists and belongs to user
    const existingArticle = await prisma.article.findUnique({
      where: { id: params.id }
    });

    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    if (existingArticle.authorId !== session.user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    const updatedArticle = await prisma.article.update({
      where: { id: params.id },
      data: {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt || data.content.substring(0, 200) + '...',
        coverImage: data.coverImage,
        published: data.published,
        categories: data.categories ? {
          set: [],
          connectOrCreate: data.categories.map((name: string) => ({
            where: { name },
            create: { name }
          }))
        } : undefined,
        tags: data.tags ? {
          set: [],
          connectOrCreate: data.tags.map((name: string) => ({
            where: { name },
            create: { name }
          }))
        } : undefined,
      },
      include: {
        author: {
          select: { id: true, name: true, email: true, image: true }
        },
        categories: true,
        tags: true,
      }
    });

    return NextResponse.json(updatedArticle);

  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

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

    // Check if article exists and belongs to user
    const article = await prisma.article.findUnique({
      where: { id: params.id }
    });

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    if (article.authorId !== session.user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    await prisma.article.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
