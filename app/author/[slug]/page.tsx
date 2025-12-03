import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAuthor, getAllAuthors } from "@/lib/data/authors";
import { getBlogPostsByAuthor } from "@/lib/content/blog";
import { Calendar, Clock } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const authors = getAllAuthors();
  return authors.map((author) => ({
    slug: author.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);

  if (!author) {
    return {
      title: "Author Not Found",
    };
  }

  return {
    title: `${author.name} - Author`,
    description: `${author.bio} Read all articles by ${author.name}.`,
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = getAuthor(slug);

  if (!author) {
    notFound();
  }

  const posts = getBlogPostsByAuthor(slug);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Author Header */}
      <div className="mb-12 flex flex-col items-center text-center">
        <div className="mb-6 h-32 w-32 overflow-hidden rounded-full">
          <Image
            src={author.avatar}
            alt={author.name}
            width={128}
            height={128}
            className="h-full w-full object-cover"
          />
        </div>
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          {author.name}
        </h1>
        <p className="mb-4 text-xl text-gray-600 dark:text-gray-400">
          {author.role}
        </p>
        <p className="max-w-2xl text-lg text-gray-700 dark:text-gray-300">
          {author.bio}
        </p>
      </div>

      {/* Articles Section */}
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-50">
          Articles by {author.name.split(" ")[0]}
        </h2>

        {posts.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No articles published yet.
          </p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border-b border-gray-200 pb-8 last:border-0 dark:border-gray-800"
              >
                <Link href={`/blog/${post.slug}`} className="group">
                  <h3 className="mb-2 text-2xl font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-50 dark:group-hover:text-blue-400">
                    {post.title}
                  </h3>
                </Link>

                <div className="mb-3 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    {post.readTime}
                  </span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    {post.category}
                  </span>
                </div>

                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  {post.description}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Read article →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
