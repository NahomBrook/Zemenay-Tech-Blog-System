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

// Configure CORS with specific options
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-production-domain.com'] 
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight for all routes

// Parse JSON bodies
app.use(express.json());

// Log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
app.use(morgan('dev')); // Logging requests

// ===== Authentication Middleware =====
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// ===== Middleware for Admin Authentication =====
const checkAdmin = [
  authenticateJWT,
  (req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') {
      return next();
    }
    return res.status(403).json({ error: 'Access denied: Admins only' });
  }
];

// ===== User Routes =====
app.post('/api/login', async (req, res) => {
  console.log('Login request received:', { email: req.body.email });
  
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Find user by email
    const user = await prisma.user.findUnique({ 
      where: { email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    // Check if user exists
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;
    
    console.log('Login successful for user:', user.email);
    
    // Send response with token and user data
    res.json({ 
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'An error occurred during login',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: 'USER' // Default role
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true
      }
    });
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      message: 'User registered successfully',
      user,
      token
    });
    
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

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

import jwt from 'jsonwebtoken';

// Add this to your environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ 
      where: { email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        role: true
      }
    });
    
    if (user && await bcrypt.compare(password, user.password)) {
      // Create token
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      // Remove password from user object before sending
      const { password: _, ...userWithoutPassword } = user;
      
      res.json({ 
        message: 'Login successful', 
        user: userWithoutPassword,
        token 
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ===== Posts Routes =====
app.get('/api/posts', async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { author: true, category: true, tags: true },
  });
  res.json(posts);
});

app.post('/api/posts', async (req, res) => {
  try {
    const {
      title, slug, content, excerpt, coverImage,
      published = false, isFeatured = false,
      authorId, categoryId, tagIds = []
    } = req.body;

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
    const [featured, latest, postsWithLikes, categories] = await Promise.all([
      prisma.post.findFirst({
        where: { published: true, isFeatured: true },
        include: { author: true, category: true, tags: true, _count: { select: { comments: true, likes: true } } },
        orderBy: { views: 'desc' },
      }),
      prisma.post.findMany({
        where: { published: true },
        include: { author: true, category: true, tags: true, _count: { select: { comments: true, likes: true } } },
        orderBy: { createdAt: 'desc' },
        take: 6,
      }),
      prisma.post.findMany({
        where: { published: true },
        include: { author: true, category: true, tags: true, likes: true, _count: { select: { comments: true } } },
        take: 6,
      }),
      prisma.category.findMany({
        include: { _count: { select: { posts: true } } },
      }),
    ]);

    const popular = [...postsWithLikes].sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));

    res.json({
      featured: featured ? [featured] : [],
      latest,
      popular,
      categories,
    });
  } catch (error) {
    console.error('Error fetching home data:', error);
    res.status(500).json({ message: 'Error fetching home data' });
  }
});

// ===== Plans API =====
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

    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    const existingPlan = await prisma.plan.findUnique({ where: { name } });
    if (existingPlan) return res.status(400).json({ error: 'Plan name already exists' });

    const plan = await prisma.plan.create({
      data: { name, price: parseFloat(price), description: description || '' },
    });

    res.json(plan);

  } catch (error) {
    console.error('Error creating plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ===== Payment API =====
app.post('/api/pay', async (req, res) => {
  try {
    const { userId, planId, amount, email, firstName, lastName } = req.body;
    if (!userId || !planId || !amount || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

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
        data: {
          userId,
          planId,
          amount,
          status: 'pending',
          transactionId: response.data.tx_ref,
        },
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

// ===== User Profile Routes =====
app.get('/api/users/me', checkAuth, async (req, res) => {
  try {
    // Get user ID from the authenticated session
    const userId = req.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        avatar: true,
        bio: true,
        role: true
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

app.put('/api/users/me', checkAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName, email, bio, avatar } = req.body;
    
    // Basic validation
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'First name, last name, and email are required' });
    }
    
    // Check if email is already taken by another user
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        NOT: { id: userId }
      }
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        email,
        bio: bio || null,
        avatar: avatar || null
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        avatar: true,
        bio: true,
        role: true
      }
    });
    
    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

app.put('/api/users/me/password', checkAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required' });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long' });
    }
    
    // Get the user
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }
    
    // Hash and update the new password
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });
    
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Failed to update password' });
  }
});

// ===== Admin Routes =====
app.get('/api/admin/users', checkAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: false, // never send passwords
      }
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.delete('/api/admin/posts/:id', checkAdmin, async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const post = await prisma.post.delete({ where: { id: postId } });
    res.json({ message: 'Post deleted', post });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// ===== Start Server =====
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
