"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { ModeToggle } from "@/components/ui/mode-toggle";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-3" : "py-6"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}

          <div className="flex items-center justify-center gap-2">
            <Logo />
            <span className="text-3xl font-bold">Sessionly AI</span>
          </div>

          {/* Desktop Navigation - Glassmorphic Pill */}
          <div className="hidden lg:flex items-center gap-1 glass-card px-2 py-2">
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

          {/* Right Side - Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/sign-in"
              className="px-5 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors duration-300"
            >
              Sign in
            </Link>
            <Link href="/sign-up">
              <Button className="btn-neomorph text-cyan-400 text-lg px-8 py-6 rounded-xl font-medium relative group">
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
            className="lg:hidden p-2 rounded-lg glass-card hover:bg-white/10 transition-colors duration-300"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 glass-card p-4 space-y-2 animate-in slide-in-from-top duration-300">
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
                <Button className="btn-neomorph text-cyan-400 text-sm px-8 py-6 rounded-xl font-medium relative group">
                  <span className="btn-inner-glow" />
                  <span className="relative z-10 flex items-center">
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
