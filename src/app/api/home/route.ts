import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Get featured articles (pinned or most popular)
    const [featured, latest, popular, categories] = await Promise.all([
      // Featured articles (pinned or most viewed)
      prisma.article.findMany({
        where: { 
          published: true,
          OR: [
            { isPinned: true },
            { isFeatured: true }
          ]
        },
        include: {
          author: {
            select: { name: true, image: true }
          },
          categories: {
            select: { name: true, slug: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 3
      }),
      
      // Latest articles
      prisma.article.findMany({
        where: { published: true },
        include: {
          author: {
            select: { name: true, image: true }
          },
          categories: {
            select: { name: true, slug: true }
          },
          _count: {
            select: { comments: true, likes: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 6
      }),
      
      // Most popular articles (by views or likes)
      prisma.article.findMany({
        where: { published: true },
        include: {
          author: {
            select: { name: true, image: true }
          },
          categories: {
            select: { name: true, slug: true }
          },
          _count: {
            select: { comments: true, likes: true }
          }
        },
        orderBy: { views: 'desc' },
        take: 6
      }),
      
      // Categories with article counts
      prisma.category.findMany({
        include: {
          _count: {
            select: { articles: true }
          }
        },
        orderBy: { name: 'asc' }
      })
    ]);

    return NextResponse.json({
      featured,
      latest,
      popular,
      categories
    });

  } catch (error) {
    console.error('Error fetching home data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
