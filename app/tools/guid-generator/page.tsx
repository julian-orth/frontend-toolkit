import { redirect } from "next/navigation";

export const metadata = {
  title: "GUID Generator",
  alternates: { canonical: "/tools/uuid-generator" },
};

export default function GuidRedirectPage() {
  // Server-side redirect to the canonical UUID generator page.
  redirect("/tools/uuid-generator");
}
