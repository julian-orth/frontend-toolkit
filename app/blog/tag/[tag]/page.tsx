import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getBlogPostsByTag, getAllTags } from "@/lib/content/blog";
import { Calendar, Clock, Tag as TagIcon, ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getBlogPostsByTag(decodedTag);

  return {
    title: `Posts tagged "${decodedTag}"`,
    description: `Explore ${posts.length} blog post${posts.length !== 1 ? "s" : ""} about ${decodedTag}. Developer tutorials, guides, and best practices.`,
    keywords: [decodedTag, "blog", "tutorials", "developer guides"],
    openGraph: {
      title: `Posts tagged "${decodedTag}" | Frontend Toolkit`,
      description: `Explore ${posts.length} blog post${posts.length !== 1 ? "s" : ""} about ${decodedTag}.`,
      type: "website",
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getBlogPostsByTag(decodedTag);
  const allTags = getAllTags();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Blog
        </Link>
      </div>

      {/* Header */}
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-2">
          <TagIcon
            className="h-8 w-8 text-blue-600 dark:text-blue-400"
            aria-hidden="true"
          />
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Posts tagged &quot;{decodedTag}&quot;
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {posts.length} post{posts.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* All Tags */}
      <section className="mb-12">
        <h2 className="mb-4 text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
          All Tags
        </h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map((t) => (
            <Link
              key={t}
              href={`/blog/tag/${encodeURIComponent(t)}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                t === decodedTag
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              aria-label={`View posts tagged ${t}`}
              aria-current={t === decodedTag ? "page" : undefined}
            >
              {t}
            </Link>
          ))}
        </div>
      </section>

      {/* Posts */}
      <section>
        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
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
                    {post.featured && (
                      <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                        Featured
                      </span>
                    )}
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
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        className={`flex items-center gap-1 text-xs ${
                          t === decodedTag
                            ? "font-semibold text-blue-600 dark:text-blue-400"
                            : "text-gray-500 dark:text-gray-500"
                        }`}
                      >
                        <TagIcon className="h-3 w-3" aria-hidden="true" />
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
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
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-gray-900">
            <p className="text-gray-600 dark:text-gray-400">
              No posts found for tag &quot;{decodedTag}&quot;
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
