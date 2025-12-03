"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import SidebarNav from "@/components/SidebarNav";

export function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isToolPage = pathname.startsWith("/tools/");

  return (
    <>
      <Header />
      <div className="flex w-full flex-1">
        <SidebarNav />
        <main
          className={`min-w-0 flex-1 pt-20 transition-all ${isToolPage ? "md:ml-72" : ""}`}
        >
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
