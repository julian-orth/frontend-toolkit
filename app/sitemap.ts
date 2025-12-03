import { MetadataRoute } from "next";
import { TOOL_REGISTRY } from "@/lib/tools/registry";
import { getAllBlogPosts, getAllTags } from "@/lib/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://frontend-tools-hub.com";

  // Dynamically generate tool URLs from registry
  const toolUrls = TOOL_REGISTRY.map((tool) => ({
    url: `${baseUrl}${tool.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamically generate blog post URLs
  const blogPosts = getAllBlogPosts();
  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamically generate blog tag URLs
  const allTags = getAllTags();
  const tagUrls = allTags.map((tag) => ({
    url: `${baseUrl}/blog/tag/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Static pages
  const staticPages = [
    { url: baseUrl, priority: 1, changeFrequency: "weekly" as const },
    {
      url: `${baseUrl}/tools`,
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      url: `${baseUrl}/blog`,
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      url: `${baseUrl}/about`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      url: `${baseUrl}/contact`,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    },
    {
      url: `${baseUrl}/privacy`,
      priority: 0.5,
      changeFrequency: "yearly" as const,
    },
    {
      url: `${baseUrl}/terms`,
      priority: 0.5,
      changeFrequency: "yearly" as const,
    },
  ].map((page) => ({
    ...page,
    lastModified: new Date(),
  }));

  return [...staticPages, ...toolUrls, ...blogUrls, ...tagUrls];
}
