import Link from "next/link";
import { Layers } from "lucide-react";

export function Header() {
  return (
    <header className="w-full border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Layers className="h-6 w-6" />
          <span className="text-xl font-bold">Staxa</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link href="#advanced-features" className="text-sm font-medium hover:underline underline-offset-4">
            Advanced
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
            How It Works
          </Link>
          <Link href="#waitlist" className="text-sm font-medium hover:underline underline-offset-4">
            Join Waitlist
          </Link>
        </nav>
      </div>
    </header>
  );
} 