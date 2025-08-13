import { NextResponse } from 'next/server';

// Mock data for the home page
const mockCategories = [
  { id: '1', name: 'Technology', slug: 'technology' },
  { id: '2', name: 'Programming', slug: 'programming' },
  { id: '3', name: 'Web Development', slug: 'web-development' },
];

const mockAuthor = {
  id: '1',
  name: 'Admin User',
  email: 'admin@example.com',
  image: '/default-avatar.png'
};

const mockArticles = [
  {
    id: '1',
    title: 'Getting Started with Next.js 14',
    slug: 'getting-started-with-nextjs-14',
    excerpt: 'Learn the basics of Next.js 14 and how to build modern web applications.',
    content: 'Full content here...',
    coverImage: '/placeholder.svg',
    published: true,
    isPinned: true,
    isFeatured: true,
    viewCount: 100,
    likeCount: 25,
    commentCount: 10,
    createdAt: new Date('2023-10-01'),
    updatedAt: new Date('2023-10-01'),
    author: mockAuthor,
    categories: [mockCategories[0], mockCategories[1]]
  },
  // Add more mock articles as needed
];

export async function GET() {
  try {
    // Return mock data
    const featured = mockArticles.filter(article => article.isFeatured || article.isPinned);
    const latest = [...mockArticles].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 5);
    const popular = [...mockArticles].sort((a, b) => b.viewCount - a.viewCount).slice(0, 5);
    const categories = mockCategories;

    return NextResponse.json({
      success: true,
      data: {
        featured,
        latest,
        popular,
        categories
      }
    });
  } catch (error) {
    console.error('Error in home API route:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load home page data' },
      { status: 500 }
    );
  }
}
