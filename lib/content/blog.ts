import fs from "fs";
import path from "path";
import type { BlogPost, BlogPostMetadata } from "@/lib/types/blog";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Parse frontmatter and content from markdown file
 */
function parseMarkdown(fileContent: string): {
  metadata: BlogPostMetadata;
  content: string;
} {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    throw new Error("Invalid markdown format: missing frontmatter");
  }

  const [, frontmatterString, content] = match;

  // Parse YAML-like frontmatter manually (no dependencies)
  const metadata: Record<string, any> = {};
  const lines = frontmatterString.split("\n");

  let currentKey = "";
  let isArrayValue = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) continue;

    // Handle array items
    if (trimmed.startsWith("- ")) {
      if (isArrayValue && currentKey) {
        const value = trimmed.slice(2).trim();
        if (!Array.isArray(metadata[currentKey])) {
          metadata[currentKey] = [];
        }
        metadata[currentKey].push(value);
      }
      continue;
    }

    // Handle key-value pairs
    const colonIndex = trimmed.indexOf(":");
    if (colonIndex > -1) {
      const key = trimmed.slice(0, colonIndex).trim();
      const value = trimmed.slice(colonIndex + 1).trim();

      currentKey = key;

      if (value === "") {
        // Empty value means array follows
        isArrayValue = true;
        metadata[key] = [];
      } else {
        // Direct value
        isArrayValue = false;
        metadata[key] = value;
      }
    }
  }

  // Extract nested seo object
  const seo = {
    keywords: metadata.keywords || [],
    ogImage: metadata.ogImage || undefined,
    canonical: metadata.canonical || undefined,
  };

  const blogMetadata: BlogPostMetadata = {
    slug: metadata.slug,
    title: metadata.title,
    description: metadata.description,
    author: metadata.author,
    publishedAt: metadata.publishedAt,
    updatedAt: metadata.updatedAt || undefined,
    readTime: metadata.readTime,
    category: metadata.category,
    tags: metadata.tags || [],
    relatedTools: metadata.relatedTools || [],
    featured: metadata.featured === "true" || metadata.featured === true,
    seo,
  };

  return {
    metadata: blogMetadata,
    content: content.trim(),
  };
}

/**
 * Get all blog post slugs
 */
export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_CONTENT_DIR);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

/**
 * Get a single blog post by slug
 */
export function getBlogPost(slug: string): BlogPost {
  const filePath = path.join(BLOG_CONTENT_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { metadata, content } = parseMarkdown(fileContent);

  return {
    ...metadata,
    content,
  };
}

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getAllBlogPosts(): BlogPost[] {
  const slugs = getAllBlogSlugs();

  const posts = slugs.map((slug) => getBlogPost(slug));

  // Sort by publishedAt (newest first)
  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Get featured blog posts
 */
export function getFeaturedBlogPosts(): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.featured);
}

/**
 * Get blog posts by category
 */
export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.category === category);
}

/**
 * Get blog posts by tag
 */
export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.tags.includes(tag));
}

/**
 * Get related blog posts based on tags and category
 */
export function getRelatedBlogPosts(
  currentSlug: string,
  limit: number = 3
): BlogPost[] {
  const currentPost = getBlogPost(currentSlug);
  const allPosts = getAllBlogPosts().filter(
    (post) => post.slug !== currentSlug
  );

  // Score posts by relevance
  const scoredPosts = allPosts.map((post) => {
    let score = 0;

    // Same category
    if (post.category === currentPost.category) {
      score += 3;
    }

    // Shared tags
    const sharedTags = post.tags.filter((tag) =>
      currentPost.tags.includes(tag)
    );
    score += sharedTags.length * 2;

    // Shared related tools
    const sharedTools = post.relatedTools.filter((tool) =>
      currentPost.relatedTools.includes(tool)
    );
    score += sharedTools.length;

    return { post, score };
  });

  // Sort by score and return top N
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

/**
 * Convert markdown to HTML (simple implementation without dependencies)
 */
export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Code blocks
  html = html.replace(
    /```([a-z]*)\n([\s\S]*?)```/g,
    "<pre><code>$2</code></pre>"
  );

  // Inline code
  html = html.replace(/`(.+?)`/g, "<code>$1</code>");

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Unordered lists
  html = html.replace(/^\* (.+)$/gim, "<li>$1</li>");
  html = html.replace(/(<li>[\s\S]*<\/li>)/, "<ul>$1</ul>");

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gim, "<li>$1</li>");

  // Paragraphs (split by double newlines)
  const paragraphs = html.split("\n\n");
  html = paragraphs
    .map((p) => {
      const trimmed = p.trim();
      // Don't wrap if already wrapped in a tag
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<ol") ||
        trimmed.startsWith("<pre") ||
        trimmed.startsWith("<blockquote")
      ) {
        return trimmed;
      }
      return `<p>${trimmed}</p>`;
    })
    .join("\n");

  return html;
}
