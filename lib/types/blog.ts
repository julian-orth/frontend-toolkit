/**
 * Blog Post Type Definitions
 */

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string; // ISO date string
  updatedAt?: string; // ISO date string
  readTime: string; // e.g., "5 min read"
  category: BlogCategory;
  tags: string[];
  relatedTools: string[]; // Tool IDs from registry
  featured: boolean;
  seo: {
    keywords: string[];
    ogImage?: string;
    canonical?: string;
  };
}

export type BlogCategory = "tutorial" | "guide" | "update" | "announcement";

export interface BlogPostMetadata {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  category: BlogCategory;
  tags: string[];
  relatedTools: string[];
  featured: boolean;
  seo: {
    keywords: string[];
    ogImage?: string;
    canonical?: string;
  };
}
