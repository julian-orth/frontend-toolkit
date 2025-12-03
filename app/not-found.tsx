import type { Metadata } from "next";
import NotFoundClient from "./not-found-client";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description:
    "Oops! The page you're looking for doesn't exist. Return to our collection of developer tools.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return <NotFoundClient />;
}
