import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import cors from 'cors';
import helmet from 'helmet';
import Chapa from 'chapa';
import morgan from 'morgan';

const app = express();
const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

// Initialize Chapa
const chapa = new Chapa({
  secretKey: process.env.CHAPA_TEST_KEY || 'CHASECK_TEST-1234567890',
  production: false,
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ===== Middleware for Admin Authentication =====
function checkAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader === 'Bearer admin') {
    return next();
  }
  return res.status(403).json({ error: 'Access denied: Admins only' });
}

// ===== User Routes =====
app.post('/api/users', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
      data: { firstName, lastName, email, password: hashedPassword },
    });
    res.json({ message: 'User created', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ===== Posts Routes =====
// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});


app.get('/api/posts', async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { author: true, category: true, tags: true },
  });
  res.json(posts);
});

app.post('/api/posts', async (req, res) => {
  try {
    const { title, slug, content, excerpt, coverImage, published = false, isFeatured = false, authorId, categoryId, tagIds = [] } = req.body;
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
      include: { author: true, category: true, tags: true },
    });
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// ===== Home Page Endpoint =====
app.get('/api/home', async (req, res) => {
  try {
    const [featured, latest, popularPosts, categories] = await Promise.all([
      prisma.post.findFirst({
        where: { published: true, isFeatured: true },
        include: { author: true, category: true, tags: true },
        orderBy: { views: 'desc' },
      }),
      prisma.post.findMany({
        where: { published: true },
        include: { author: true, category: true, tags: true },
        orderBy: { createdAt: 'desc' },
        take: 6,
      }),
      prisma.post.findMany({
        where: { published: true },
        include: { author: true, category: true, tags: true },
        take: 6,
        orderBy: { views: 'desc' },
      }),
      prisma.category.findMany({
        include: { _count: { select: { posts: true } } },
      }),
    ]);

    res.json({
      featured: featured ? [featured] : [],
      latest,
      popular: popularPosts,
      categories,
    });
  } catch (error) {
    console.error('Error fetching home data:', error);
    res.status(500).json({ message: 'Error fetching home data' });
  }
});

// ===== Plans & Payment Routes =====
app.get('/api/plans', async (req, res) => {
  try {
    const plans = await prisma.plan.findMany();
    res.json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({ error: 'Failed to fetch plans' });
  }
});

app.post('/api/plans', async (req, res) => {
  try {
    const { name, price, description } = req.body;
    if (!name || !price) return res.status(400).json({ error: 'Name and price are required' });
    const existingPlan = await prisma.plan.findUnique({ where: { name } });
    if (existingPlan) return res.status(400).json({ error: 'Plan name already exists' });
    const plan = await prisma.plan.create({ data: { name, price: parseFloat(price), description: description || '' } });
    res.json(plan);
  } catch (error) {
    console.error('Error creating plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/pay', async (req, res) => {
  try {
    const { userId, planId, amount, email, firstName, lastName } = req.body;
    if (!userId || !planId || !amount || !email) return res.status(400).json({ error: 'Missing required fields' });
    const plan = await prisma.plan.findUnique({ where: { id: planId } });
    if (!plan) return res.status(404).json({ error: 'Plan not found' });

    const paymentData = {
      amount: amount.toString(),
      currency: 'ETB',
      email,
      first_name: firstName,
      last_name: lastName,
      tx_ref: `tx-${Date.now()}-${userId}`,
      callback_url: 'https://your-callback-url.com',
      return_url: 'https://your-return-url.com',
      customization: { title: 'Zemenay Blog Subscription' },
    };

    const response = await chapa.initialize(paymentData);
    if (response.status) {
      await prisma.payment.create({
        data: { userId, planId, amount, status: 'pending', transactionId: response.data.tx_ref },
      });
      res.json({ checkout_url: response.data.checkout_url });
    } else {
      throw new Error('Payment initialization failed');
    }
  } catch (error) {
    console.error('Error initiating payment:', error);
    res.status(500).json({ error: 'Failed to initiate payment' });
  }
});

// ===== Admin Routes =====
app.get('/api/admin/users', checkAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, firstName: true, lastName: true, email: true },
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.delete('/api/admin/posts/:id', checkAdmin, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await prisma.post.delete({ where: { id: postId } });
    res.json({ message: 'Post deleted', post });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// ===== Start Server =====
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
