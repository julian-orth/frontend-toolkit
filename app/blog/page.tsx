import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllBlogPosts, getAllTags } from "@/lib/content/blog";
import { SITE_CONFIG } from "@/lib/site-config";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog - Developer Tutorials, Guides & Updates",
  description:
    "Explore tutorials, best practices, and guides for web development tools. Learn JSON formatting, regex patterns, color theory, and more.",
  keywords: [
    "web development tutorials",
    "developer blog",
    "json tutorials",
    "regex guides",
    "frontend development",
    "coding best practices",
    "developer tools guides",
  ],
  openGraph: {
    title: `Blog - Developer Tutorials & Guides | ${SITE_CONFIG.name}`,
    description:
      "Explore tutorials, best practices, and guides for web development tools.",
    type: "website",
    url: `${SITE_CONFIG.domain}/blog`,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog - Developer Tutorials & Guides | ${SITE_CONFIG.name}`,
    description:
      "Explore tutorials, best practices, and guides for web development tools.",
  },
  alternates: {
    canonical: `${SITE_CONFIG.domain}/blog`,
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const featuredPosts = posts.filter((post) => post.featured);
  const recentPosts = posts.slice(0, 6);
  const allTags = getAllTags();

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          Developer Blog
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Tutorials, guides, and best practices for modern web development.
          Learn how to use developer tools effectively and write better code.
        </p>
      </div>

      {/* Tags Filter */}
      {allTags.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
            Browse by Tag
          </h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${encodeURIComponent(tag)}`}
                className="cursor-pointer rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
                aria-label={`View posts tagged ${tag}`}
              >
                {tag}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-50">
            Featured Posts
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700"
                aria-label={`Read article: ${post.title}`}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    {post.category}
                  </span>
                  <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                    Featured
                  </span>
                </div>

                <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-600 dark:text-gray-50 dark:group-hover:text-blue-400">
                  {post.title}
                </h3>

                <p className="mb-4 line-clamp-3 text-gray-600 dark:text-gray-400">
                  {post.description}
                </p>

                <div className="mb-4 flex items-center gap-2">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {post.author.name}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                  Read more
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-50">
          All Posts
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {recentPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group"
                aria-label={`Read article: ${post.title}`}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                    {post.category}
                  </span>
                </div>

                <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-600 dark:text-gray-50 dark:group-hover:text-blue-400">
                  {post.title}
                </h3>

                <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-400">
                  {post.description}
                </p>

                <div className="mb-4 flex items-center gap-2">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={20}
                    height={20}
                    className="h-5 w-5 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {post.author.name}
                  </span>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500"
                    >
                      <Tag className="h-3 w-3" aria-hidden="true" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-gray-900">
          <p className="text-gray-600 dark:text-gray-400">
            No blog posts yet. Check back soon!
          </p>
        </div>
      )}
    </main>
  );
}
