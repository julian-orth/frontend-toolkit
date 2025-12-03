import Link from "next/link";
import Image from "next/image";
import type { Author } from "@/lib/data/authors";

interface AuthorCardProps {
  author: Author;
  publishedAt: string;
  readTime: string;
}

export function AuthorCard({ author, publishedAt, readTime }: AuthorCardProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
      <Link
        href={`/author/${author.id}`}
        className="shrink-0 transition-opacity hover:opacity-80"
      >
        <Image
          src={author.avatar}
          alt={author.name}
          width={64}
          height={64}
          className="h-16 w-16 rounded-full object-cover"
        />
      </Link>
      <div className="min-w-0 flex-1">
        <Link href={`/author/${author.id}`} className="group inline-block">
          <p className="font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-50 dark:group-hover:text-blue-400">
            {author.name}
          </p>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {author.role}
        </p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
          {formattedDate} · {readTime}
        </p>
      </div>
    </div>
  );
}
