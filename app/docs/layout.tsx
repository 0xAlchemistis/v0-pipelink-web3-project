'use client';

import React from "react"

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BookOpen, Zap, Code2, Shield, ChevronDown, Menu, X, Home } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  {
    title: 'Overview',
    href: '/docs/overview',
    icon: BookOpen,
  },
  {
    title: 'Getting Started',
    href: '/docs/getting-started',
    icon: Zap,
  },
  {
    title: 'API Reference',
    href: '/docs/api-reference',
    icon: Code2,
  },
  {
    title: 'Security',
    href: '/docs/security',
    icon: Shield,
  },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="sticky top-0 z-40 md:hidden border-b border-border bg-background">
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/docs" className="flex items-center gap-2">
            <Image 
              src="/pipelink-logo.png" 
              alt="PIPELINK Logo" 
              width={32} 
              height={32}
              className="rounded-lg"
            />
            <span className="font-bold text-foreground">Docs</span>
          </Link>
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {mobileNavOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileNavOpen && (
          <div className="border-t border-border bg-card/50 backdrop-blur-sm">
            <nav className="flex flex-col">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileNavOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 border-l-2 transition-colors ${
                      isActive
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-transparent text-foreground/70 hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.title}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card/50 sticky top-0 h-screen overflow-y-auto">
          <div className="p-6 border-b border-border">
            <Link href="/docs" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image 
                src="/pipelink-logo.png" 
                alt="PIPELINK Logo" 
                width={32} 
                height={32}
                className="rounded-lg"
              />
              <span className="font-bold text-foreground">PIPELINK Docs</span>
            </Link>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary/10 border border-primary text-primary font-semibold'
                      : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.title}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer Links */}
          <div className="border-t border-border p-4 space-y-2">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 text-sm text-foreground/60 hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <a
              href="https://github.com/pipelinktech/pipelink-sdk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-sm text-foreground/60 hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
            >
              <Code2 className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
