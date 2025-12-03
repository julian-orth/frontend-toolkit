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
import { Calendar, Clock, Tag, ArrowLeft, ExternalLink } from "lucide-react";

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
      authors: [{ name: post.author }],
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
        authors: [post.author],
        url: `https://yourdomain.com/blog/${post.slug}`,
        images: post.seo.ogImage ? [{ url: post.seo.ogImage }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        images: post.seo.ogImage ? [post.seo.ogImage] : undefined,
      },
      alternates: post.seo.canonical
        ? { canonical: post.seo.canonical }
        : undefined,
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

  // JSON-LD Structured Data for SEO
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
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Frontend Toolkit",
      logo: {
        "@type": "ImageObject",
        url: "https://yourdomain.com/logo.png",
      },
    },
    keywords: post.seo.keywords.join(", "),
    articleSection: post.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
        <header className="mb-8">
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

          <div className="flex flex-wrap items-center gap-6 border-b border-gray-200 pb-6 text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span className="font-medium">By {post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  <Tag className="h-3 w-3" aria-hidden="true" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="mx-auto max-w-3xl">
          <div
            className="prose prose-lg prose-gray dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-3xl prose-h3:mb-3 prose-h3:mt-6 prose-h3:text-2xl prose-p:mb-4 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-blue-400 prose-strong:font-semibold prose-code:rounded prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono prose-code:text-gray-900 dark:prose-code:bg-gray-800 dark:prose-code:text-gray-100 prose-pre:bg-gray-900 prose-pre:text-gray-100 dark:prose-pre:bg-gray-950 max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
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
      </article>
    </>
  );
}
