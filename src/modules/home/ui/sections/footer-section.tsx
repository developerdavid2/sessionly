"use client";

import React, { useState } from "react";
import { Github, Twitter, Linkedin, Youtube } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Use Cases", href: "#use-cases" },
    { label: "Integrations", href: "#integrations" },
  ],
  company: [
    { label: "About", href: "#about" },
    { label: "Careers", href: "#careers" },
    { label: "Contact", href: "#contact" },
    { label: "Community", href: "#community" },
  ],
  legal: [
    { label: "Privacy", href: "#privacy" },
    { label: "Terms", href: "#terms" },
    { label: "Security", href: "#security" },
    { label: "Trust", href: "#trust" },
  ],
};

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Use rAF to prevent React from batching too slowly
      requestAnimationFrame(() => {
        setMousePosition({ x, y });
      });
    },
    [],
  );

  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-32 md:pb-60">
        {/* Top Section - Newsletter & Links in Row */}
        <div className="mb-16 md:mb-20">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-20">
            {/* Newsletter Section */}
            <div className="lg:max-w-md">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                AI-powered session management.
              </h3>
              <p className="text-lg md:text-xl text-white/80 mb-6">
                Full observability with zero config.
              </p>

              {/* Newsletter Form */}
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 px-5 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                />
                <button className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 text-white font-medium rounded-lg transition-all duration-300 whitespace-nowrap">
                  Stay updated
                </button>
              </div>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 flex-1">
              <div>
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-3">
                  {footerLinks.product.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Social & Copyright */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    aria-label={social.label}
                  >
                    <div className="relative w-11 h-11 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center transition-all duration-300 group-hover:border-cyan-500/50 group-hover:bg-zinc-800 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] bg-gradient-to-br from-gray-600 via-[#1D1F1F] via-50% to-[#1D1F1F]/70 ">
                      <Icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
                    </div>
                  </a>
                );
              })}

              {/* System Status */}
              <div className="hidden md:flex items-center gap-2 ml-4 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm text-gray-400">
                  All systems operational
                </span>
              </div>
            </div>

            {/* Copyright & Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 md:gap-6 text-sm text-gray-500">
              <span>© 2025 Sessionly AI</span>
              <a
                href="#legal"
                className="hover:text-gray-300 transition-colors"
              >
                Legal
              </a>
              <a
                href="#trust"
                className="hover:text-gray-300 transition-colors"
              >
                Trust
              </a>
            </div>
          </div>

          {/* Mobile System Status */}
          <div className="md:hidden flex items-center justify-center gap-2 mt-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit mx-auto">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm text-gray-400">
              All systems operational
            </span>
          </div>
        </div>
      </div>

      {/* Large Grained Text with Hover Reveal Effect */}
      <div
        className="absolute -bottom-32 left-0 right-0 h-[400px] md:h-[500px] flex items-end justify-center overflow-hidden select-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Base layer - Grayed out text */}
          <div
            className="absolute text-[12rem] sm:text-[16rem] md:text-[20rem] font-bold tracking-tighter leading-none"
            style={{
              color: "#1a1a1a",
              opacity: 0.3,
            }}
          >
            Sessionly
          </div>

          {/* Revealed layer - Bright grained text with mask */}
          <div
            className="absolute text-[12rem] sm:text-[16rem] md:text-[20rem] font-bold tracking-tighter leading-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "400px 400px",
              clipPath: isHovering
                ? `circle(200px at ${mousePosition.x}px ${mousePosition.y}px)`
                : "circle(0px at 50% 50%)",
              transition: "clip-path 0.1s ease-out",
              opacity: 0.3,
            }}
          >
            Sessionly
          </div>

          {/* Glow effect following the mouse */}
          {isHovering && (
            <div
              className={`
          absolute w-[400px] h-[400px] rounded-full pointer-events-none
          -translate-x-1/2 -translate-y-1/2
          bg-[radial-gradient(circle,rgba(255,253,212,0.25)_0%,transparent_40%)]
          blur-[90px]
          transition-[left,top] ease-out duration-100
        `}
              style={{
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
              }}
            />
          )}
        </div>
      </div>
    </footer>
  );
};
