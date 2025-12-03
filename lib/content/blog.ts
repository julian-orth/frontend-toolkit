import fs from "fs";
import path from "path";
import type { BlogPost, BlogPostMetadata } from "@/lib/types/blog";
import { getAuthor, type Author } from "@/lib/data/authors";

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
    authorId: metadata.author, // Store as authorId in metadata
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

  // Resolve author from ID
  const author = getAuthor(metadata.authorId);
  if (!author) {
    throw new Error(`Author not found: ${metadata.authorId}`);
  }

  return {
    slug: metadata.slug,
    title: metadata.title,
    description: metadata.description,
    content,
    author,
    publishedAt: metadata.publishedAt,
    updatedAt: metadata.updatedAt,
    readTime: metadata.readTime,
    category: metadata.category,
    tags: metadata.tags,
    relatedTools: metadata.relatedTools,
    featured: metadata.featured,
    seo: metadata.seo,
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
 * Get blog posts by author
 */
export function getBlogPostsByAuthor(authorId: string): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.author.id === authorId);
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
 * Get all unique tags from all blog posts
 */
export function getAllTags(): string[] {
  const allPosts = getAllBlogPosts();
  const tagSet = new Set<string>();

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

/**
 * Convert markdown to HTML (simple implementation without dependencies)
 */
export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Code blocks (must be done before inline code)
  html = html.replace(
    /```([a-z]*)\n([\s\S]*?)```/g,
    '<pre><code class="language-$1">$2</code></pre>'
  );

  // Images (must be before links since they have similar syntax)
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="blog-image" loading="lazy" />'
  );

  // Inline code
  html = html.replace(/`(.+?)`/g, "<code>$1</code>");

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Links - check if external or internal
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    // Internal links (start with / or relative)
    if (url.startsWith("/")) {
      return `<a href="${url}">${text}</a>`;
    }
    // External links
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  });

  // Split by paragraphs first
  const sections = html.split("\n\n");
  const processedSections = sections.map((section) => {
    const trimmed = section.trim();
    if (!trimmed) return "";

    // Headers
    if (trimmed.startsWith("### ")) {
      return trimmed.replace(/^### (.*)$/gim, "<h3>$1</h3>");
    }
    if (trimmed.startsWith("## ")) {
      return trimmed.replace(/^## (.*)$/gim, "<h2>$1</h2>");
    }
    if (trimmed.startsWith("# ")) {
      return trimmed.replace(/^# (.*)$/gim, "<h1>$1</h1>");
    }

    // Code blocks (already processed)
    if (trimmed.startsWith("<pre>")) {
      return trimmed;
    }

    // Images (standalone)
    if (trimmed.startsWith("<img ")) {
      return trimmed;
    }

    // Unordered lists
    if (trimmed.match(/^\* /m)) {
      const items = trimmed
        .split("\n")
        .filter((line) => line.trim().startsWith("* "))
        .map((line) => line.replace(/^\* (.+)$/, "<li>$1</li>"))
        .join("\n");
      return `<ul>${items}</ul>`;
    }

    // Ordered lists
    if (trimmed.match(/^\d+\. /m)) {
      const items = trimmed
        .split("\n")
        .filter((line) => line.trim().match(/^\d+\. /))
        .map((line) => line.replace(/^\d+\. (.+)$/, "<li>$1</li>"))
        .join("\n");
      return `<ol>${items}</ol>`;
    }

    // Regular paragraph
    return `<p>${trimmed}</p>`;
  });

  return processedSections.join("\n\n");
}
