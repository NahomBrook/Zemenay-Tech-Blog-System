# Zemenay Tech Blog System

A modern, full-featured tech blog platform built with Next.js, TypeScript, and Prisma. This project provides a complete solution for publishing technical articles, managing content, and engaging with readers.

## Features

- **Modern Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Authentication**: Email/Password, Google OAuth, and GitHub OAuth support
- **Rich Content**: Markdown support with syntax highlighting
- **Responsive Design**: Fully responsive layout that works on all devices
- **Performance**: Optimized for fast loading and SEO
- **Admin Dashboard**: Manage posts, users, and site settings
- **Comments & Reactions**: Engage with readers through comments and reactions

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **UI Components**: Shadcn/ui
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- Google OAuth credentials (for Google login)
- GitHub OAuth credentials (for GitHub login)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/zemenay-tech-blog-system.git
   cd zemenay-tech-blog-system
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Update the `.env.local` file with your configuration.

4. Set up the database:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/zemenay_blog?schema=public"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_ID=""
GITHUB_SECRET=""

# Other
NODE_ENV="development"
```

## 📂 Project Structure

```
zemenay-tech-blog-system/
├── src/
│   ├── app/                  # App router pages and layouts
│   ├── components/           # Reusable components
│   ├── lib/                  # Utility functions and configurations
│   ├── prisma/               # Prisma schema and migrations
│   └── styles/               # Global styles
├── public/                   # Static files
└── tests/                    # Test files
```

## 🧪 Running Tests

```bash
npm test
# or
yarn test
```

### Other Platforms

This project can be deployed to any platform that supports Node.js applications. Make sure to set up the required environment variables in your hosting platform.

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) to get started.


## Message
 - We have finished the frontend, as well as the backend and the database but we had some issues with the integration of the api routes at the last minute.