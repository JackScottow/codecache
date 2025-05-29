import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | CodeCache",
    default: "CodeCache",
  },
  description: "Share code and text snippets instantly",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-b from-stone-200 via-stone-300 to-stone-400 dark:from-stone-600 dark:via-stone-700 dark:to-stone-800 min-h-screen`}>
        <nav className="border-b border-stone-200 dark:border-stone-600 bg-white/30 dark:bg-stone-800/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link href="/" className="text-xl font-bold text-stone-800 dark:text-stone-100">
                CodeCache
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
