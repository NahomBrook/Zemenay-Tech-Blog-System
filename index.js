import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

app.use(helmet());
app.use(cors());
app.use(express.json());

// Existing user routes...
app.post('/api/users', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: { firstName, lastName, email, password: hashedPassword },
  });
  res.json({ message: 'User created', user });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && await bcrypt.compare(password, user.password)) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Existing posts routes...
app.get('/api/posts', async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { author: true, category: true, tags: true },
  });
  res.json(posts);
});

app.post('/api/posts', async (req, res) => {
  const { title, slug, content, excerpt, coverImage, published, authorId, categoryId, tagIds } = req.body;
  const post = await prisma.post.create({
    data: {
      title, slug, content, excerpt, coverImage, published,
      author: { connect: { id: authorId } },
      category: categoryId ? { connect: { id: categoryId } } : undefined,
      tags: { connect: tagIds.map(id => ({ id })) },
    },
    include: { author: true, category: true, tags: true },
  });
  res.json(post);
});

// Updated /api/home endpoint
app.post('/api/posts', async (req, res) => {
  try {
    const { 
      title, 
      slug, 
      content, 
      excerpt, 
      coverImage, 
      published = false, 
      isFeatured = false,
      authorId, 
      categoryId, 
      tagIds = [] 
    } = req.body;

    // Input validation
    if (!title || !content || !authorId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
        content,
        excerpt: excerpt || content.substring(0, 100) + '...',
        coverImage,
        published,
        isFeatured,
        author: { connect: { id: authorId } },
        category: categoryId ? { connect: { id: categoryId } } : undefined,
        tags: { connect: tagIds.map(id => ({ id })) },
      },
      include: { 
        author: true, 
        category: true, 
        tags: true 
      }
    });

    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ 
      error: 'Failed to create post',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));