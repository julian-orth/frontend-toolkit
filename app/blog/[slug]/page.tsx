import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllBlogSlugs,
  getBlogPost,
  getRelatedBlogPosts,
  markdownToHtml,
} from "@/lib/content/blog";
import { TOOLS } from "@/lib/tools/registry";
import { SITE_CONFIG, getBlogUrl } from "@/lib/site-config";
import { Calendar, Clock, Tag, ArrowLeft, ExternalLink } from "lucide-react";
import { AuthorCard } from "@/components/author-card";
import { BlogTableOfContents } from "@/components/blog-table-of-contents";
import { BlogContent } from "@/components/blog-content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = getBlogPost(slug);

    return {
      title: post.title,
      description: post.description,
      keywords: post.seo.keywords,
      authors: [{ name: post.author.name }],
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
        authors: [post.author.name],
        url: getBlogUrl(post.slug),
        siteName: SITE_CONFIG.name,
        images: post.seo.ogImage ? [{ url: post.seo.ogImage }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        images: post.seo.ogImage ? [post.seo.ogImage] : undefined,
      },
      alternates: {
        canonical: post.seo.canonical || getBlogUrl(post.slug),
      },
      other: {
        "article:published_time": post.publishedAt,
        "article:modified_time": post.updatedAt || post.publishedAt,
        "article:author": post.author.name,
        "article:section": post.category,
        "article:tag": post.tags.join(","),
        "twitter:data1": post.readTime,
        "twitter:label1": "Reading time",
      },
    };
  } catch {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = getBlogPost(slug);
  } catch {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(slug, 3);
  const relatedTools = TOOLS.filter((tool) =>
    post.relatedTools.includes(tool.id)
  );
  const contentHtml = markdownToHtml(post.content);

  // Calculate word count for article body
  const wordCount = post.content.split(/\s+/).length;
  const articleBodyPreview = post.content
    .replace(/[#*_\[\]()]/g, "")
    .substring(0, 500);

  // Enhanced JSON-LD Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.description,
    image: post.seo.ogImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: `https://developerutilitytools.com/author/${post.author.id}`,
    },
    publisher: {
      "@type": "Organization",
      name: "DeveloperUtilityTools",
      logo: {
        "@type": "ImageObject",
        url: "https://developerutilitytools.com/logo.png",
      },
    },
    keywords: post.seo.keywords.join(", "),
    articleSection: post.category,
    wordCount: wordCount,
    timeRequired: post.readTime,
    articleBody: articleBodyPreview,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://developerutilitytools.com/blog/${post.slug}`,
    },
  };

  // Breadcrumb Structured Data
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://developerutilitytools.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://developerutilitytools.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://developerutilitytools.com/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="container mx-auto px-4 py-12">
        {/* Back Link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          aria-label="Back to blog overview"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-24">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              {post.category}
            </span>
            {post.featured && (
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                Featured
              </span>
            )}
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl dark:text-gray-50">
            {post.title}
          </h1>

          <p className="mb-6 text-xl text-gray-600 dark:text-gray-400">
            {post.description}
          </p>

          {/* Author Card */}
          <div className="mb-6">
            <AuthorCard
              author={post.author}
              publishedAt={post.publishedAt}
              readTime={post.readTime}
            />
          </div>

          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${encodeURIComponent(tag)}`}
                  className="flex cursor-pointer items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
                  aria-label={`View posts tagged ${tag}`}
                >
                  <Tag className="h-3 w-3" aria-hidden="true" />
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Main Content with Sidebar Layout */}
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-12">
          {/* Desktop Sticky TOC Sidebar */}
          <aside className="hidden lg:block">
            <BlogTableOfContents content={contentHtml} />
          </aside>

          {/* Article Content */}
          <div className="min-w-0">
            {/* Mobile TOC */}
            <div className="lg:hidden">
              <BlogTableOfContents content={contentHtml} />
            </div>

            <div className="mx-auto max-w-3xl">
              <BlogContent content={contentHtml} />
            </div>

            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <section className="mx-auto mt-16 max-w-3xl border-t border-gray-200 pt-12 dark:border-gray-800">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-50">
                  Related Tools
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {relatedTools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.id}`}
                      className="group rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700"
                      aria-label={`Open ${tool.name} tool`}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-50 dark:group-hover:text-blue-400">
                          {tool.name}
                        </h3>
                        <ExternalLink
                          className="h-4 w-4 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {tool.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mx-auto mt-16 max-w-3xl border-t border-gray-200 pt-12 dark:border-gray-800">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-50">
                  Related Articles
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className="group rounded-lg border border-gray-200 bg-white p-5 transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700"
                      aria-label={`Read article: ${relatedPost.title}`}
                    >
                      <span className="mb-2 inline-block rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                        {relatedPost.category}
                      </span>
                      <h3 className="mb-2 font-bold text-gray-900 group-hover:text-blue-600 dark:text-gray-50 dark:group-hover:text-blue-400">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {relatedPost.readTime}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
