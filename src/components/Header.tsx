import Link from "next/link";
import { Layers, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="w-full border-b bg-white dark:bg-gray-950 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Layers className="h-6 w-6" />
          <span className="text-xl font-bold">Staxa</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link href="#advanced-features" className="text-sm font-medium hover:underline underline-offset-4">
            Advanced
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
            How It Works
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
          <Link href="#waitlist" className="text-sm font-medium hover:underline underline-offset-4">
            Join Waitlist
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md"
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
          <nav className="flex flex-col space-y-4">
            <Link 
              href="#features" 
              className="text-base font-medium px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="#advanced-features" 
              className="text-base font-medium px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Advanced
            </Link>
            <Link 
              href="#how-it-works" 
              className="text-base font-medium px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              href="#pricing" 
              className="text-base font-medium px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="#waitlist" 
              className="text-base font-medium px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Join Waitlist
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
} 