
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Sidebar } from "../components/Sidebar";

export const metadata: Metadata = {
  title: "TryTrack",
  description: "Athlete performance & wellness for schools and clubs",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen grid md:grid-cols-[240px_1fr]">
          <aside className="hidden md:block">
            <Sidebar />
          </aside>
          <main className="min-h-screen">{children}</main>
        </div>
      </body>
    </html>
  );
}
