// Blog post data structure
export interface BlogPost {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  slug: string;
  featured?: boolean;
}

// Blog posts data
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Introducing DevHunt API: Build Powerful Developer Tool Integrations",
    description: "Today, we're excited to announce the launch of the DevHunt API, enabling developers to integrate our platform's data and features into their applications.",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Announcements",
    author: {
      name: "Alpian",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80"
    },
    date: "June 15, 2025",
    readTime: "5 min read",
    slug: "introducing-devhunt-api",
    featured: true
  },
  {
    id: "2",
    title: "10 Must-Have Developer Tools for 2025",
    description: "We've curated a list of the most impactful developer tools that are transforming workflows and boosting productivity in 2025.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    category: "Tools",
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
    },
    date: "June 8, 2025",
    readTime: "8 min read",
    slug: "10-must-have-developer-tools-2025"
  },
  {
    id: "3",
    title: "The Rise of AI-powered Development Tools",
    description: "Explore how artificial intelligence is revolutionizing the development process and making developers more efficient than ever.",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "AI",
    author: {
      name: "Miguel Rodriguez",
      avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1534&q=80"
    },
    date: "May 30, 2025",
    readTime: "10 min read",
    slug: "rise-of-ai-powered-development-tools"
  },
  {
    id: "4",
    title: "Building a Developer Community: Lessons Learned",
    description: "Learn from our experience building and nurturing the DevHunt community, with practical tips for fostering engagement.",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Community",
    author: {
      name: "Olivia Martinez",
      avatar: "https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
    },
    date: "May 22, 2025",
    readTime: "7 min read",
    slug: "building-developer-community-lessons-learned"
  },
  {
    id: "5",
    title: "From Idea to Launch: The DevHunt Journey",
    description: "The story behind DevHunt's creation, the challenges we faced, and how we built a platform that developers love.",
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Story",
    author: {
      name: "Alpian",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80"
    },
    date: "May 15, 2025",
    readTime: "12 min read",
    slug: "from-idea-to-launch-devhunt-journey"
  },
  {
    id: "6",
    title: "Database Optimization Techniques for Developer Tools",
    description: "Practical tips and techniques for optimizing database performance in developer tools and platforms.",
    imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80",
    category: "Engineering",
    author: {
      name: "Priya Patel",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
    },
    date: "May 8, 2025",
    readTime: "9 min read",
    slug: "database-optimization-techniques"
  }
];