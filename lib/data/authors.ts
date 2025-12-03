/**
 * Author Data
 * Team member information for blog posts
 */

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export const AUTHORS: Record<string, Author> = {
  "sarah-johnson": {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    role: "Frontend Developer",
    bio: "Frontend developer passionate about building intuitive web tools and developer experiences.",
    avatar: "/images/team/sarah-johnson.jpg",
  },
  "michael-chen": {
    id: "michael-chen",
    name: "Michael Chen",
    role: "Full Stack Developer",
    bio: "Full stack developer focused on web performance and developer productivity tools.",
    avatar: "/images/team/michael-chen.jpg",
  },
  "emily-rodriguez": {
    id: "emily-rodriguez",
    name: "Emily Rodriguez",
    role: "UI/UX Designer",
    bio: "Designer and developer creating user-friendly interfaces for technical tools.",
    avatar: "/images/team/emily-rodriguez.jpg",
  },
  "david-kim": {
    id: "david-kim",
    name: "David Kim",
    role: "Software Engineer",
    bio: "Software engineer specializing in JavaScript tooling and web standards.",
    avatar: "/images/team/david-kim.jpg",
  },
  "jessica-taylor": {
    id: "jessica-taylor",
    name: "Jessica Taylor",
    role: "Technical Writer",
    bio: "Technical writer helping developers understand complex concepts through clear documentation.",
    avatar: "/images/team/jessica-taylor.jpg",
  },
};

export function getAuthor(id: string): Author | undefined {
  return AUTHORS[id];
}

export function getAllAuthors(): Author[] {
  return Object.values(AUTHORS);
}
