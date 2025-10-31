"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Documentation", href: "/documentation" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-xl bg-black/40 border-b border-white/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Logo />
            {/* Show text only on large screens */}
            <span className="hidden lg:inline text-2xl font-bold tracking-tight">
              Sessionly AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 glass-card px-2 py-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-5 py-2 rounded-full text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#5dd5ed]/0 via-[#5dd5ed]/10 to-[#4fc3f7]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            ))}
          </div>

          {/* Right Side (Auth Buttons) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/sign-in"
              className={`px-5 py-2 text-sm font-medium transition-colors duration-300 rounded-full ${
                isScrolled
                  ? "backdrop-blur-md bg-white/5 border border-white/10 text-white/80 hover:text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Sign in
            </Link>

            <Link href="/sign-up">
              <Button
                className={`btn-neomorph text-cyan-400 text-lg px-8 py-6 rounded-xl font-medium relative group transition-all duration-300 ${
                  isScrolled
                    ? "backdrop-blur-md bg-white/5 border border-white/10"
                    : ""
                }`}
              >
                <span className="btn-inner-glow" />
                <span className="relative z-10 flex items-center">
                  Get Started
                </span>
                <span className="btn-glow-top" />
                <span className="btn-glow-bottom" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${
              isScrolled
                ? "backdrop-blur-lg bg-white/10 border border-white/10"
                : "glass-card"
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 backdrop-blur-xl border border-white/10 rounded-2xl p-4 space-y-2 animate-in fade-in slide-in-from-top duration-300">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <Link
                href="/sign-in"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                Sign in
              </Link>
              <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="btn-neomorph text-cyan-400 text-sm px-8 py-6 rounded-xl font-medium relative group w-full">
                  <span className="btn-inner-glow" />
                  <span className="relative z-10 flex items-center justify-center">
                    Get Started
                  </span>
                  <span className="btn-glow-top" />
                  <span className="btn-glow-bottom" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
