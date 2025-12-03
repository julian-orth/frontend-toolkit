"use client";

import { useState } from "react";
import { Linkedin, Link as LinkIcon, Check } from "lucide-react";

// Custom X (Twitter) icon
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Custom Reddit icon
function RedditIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  );
}

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export function SocialShare({ url, title, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = description ? encodeURIComponent(description) : "";

  const shareLinks = {
    x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="mx-auto mt-12 max-w-3xl border-y border-gray-200 py-8 dark:border-gray-800">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-50">
        Share this article
      </h3>
      <div className="flex flex-wrap gap-3">
        <a
          href={shareLinks.x}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-gray-900 to-black px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:from-black hover:to-gray-900 hover:shadow-lg focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:outline-none dark:shadow-gray-900/20 dark:focus:ring-offset-gray-900"
          aria-label="Share on X"
        >
          <XIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
          <span>X</span>
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-blue-700 to-blue-800 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-800 hover:to-blue-900 hover:shadow-lg focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:outline-none dark:shadow-blue-700/20 dark:focus:ring-offset-gray-900"
          aria-label="Share on LinkedIn"
        >
          <Linkedin
            className="h-5 w-5 transition-transform group-hover:scale-110"
            aria-hidden="true"
          />
          <span>LinkedIn</span>
        </a>
        <a
          href={shareLinks.reddit}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-orange-600 to-orange-700 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:from-orange-700 hover:to-orange-800 hover:shadow-lg focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none dark:shadow-orange-600/20 dark:focus:ring-offset-gray-900"
          aria-label="Share on Reddit"
        >
          <RedditIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
          <span>Reddit</span>
        </a>
        <button
          onClick={handleCopyLink}
          className="group flex cursor-pointer items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-gray-400 hover:bg-gray-50 hover:shadow-md focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:shadow-gray-900/20 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-900"
          aria-label="Copy link to clipboard"
        >
          {copied ? (
            <>
              <Check
                className="h-5 w-5 text-green-600 transition-transform group-hover:scale-110 dark:text-green-400"
                aria-hidden="true"
              />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <LinkIcon
                className="h-5 w-5 transition-transform group-hover:scale-110"
                aria-hidden="true"
              />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
