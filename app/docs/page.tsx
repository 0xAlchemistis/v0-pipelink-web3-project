'use client';

import Link from 'next/link';
import { Code2, Zap, Shield, BookOpen, ArrowRight, Home } from 'lucide-react';

const docLinks = [
  {
    title: 'Overview',
    description: 'Learn about PIPELINK and its core features',
    icon: BookOpen,
    href: '/docs/overview',
    color: 'text-primary',
  },
  {
    title: 'Getting Started',
    description: 'Installation and basic usage guide',
    icon: Zap,
    href: '/docs/getting-started',
    color: 'text-secondary',
  },
  {
    title: 'API Reference',
    description: 'Complete API documentation and endpoints',
    icon: Code2,
    href: '/docs/api-reference',
    color: 'text-accent',
  },
  {
    title: 'Security',
    description: 'Best practices and security guidelines',
    icon: Shield,
    href: '/docs/security',
    color: 'text-purple-400',
  },
];

export default function DocsIndexPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-secondary hover:text-accent transition-colors mb-6"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-5xl sm:text-6xl font-bold text-balance mb-4">
            <span className="text-foreground">Documentation</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Everything you need to know about PIPELINK. From basic concepts to advanced implementation patterns.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {docLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group border border-border rounded-lg p-6 hover:border-secondary hover:bg-card/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-muted rounded-lg ${link.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-foreground/40 group-hover:text-secondary transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{link.title}</h3>
                <p className="text-foreground/70">{link.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div className="border-t border-border bg-card/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-foreground mb-8">Helpful Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <a
              href="#"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-secondary hover:bg-card transition-all group"
            >
              <Code2 className="w-5 h-5 text-secondary group-hover:text-accent flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">GitHub Repository</h4>
                <p className="text-sm text-foreground/60">View source code and examples</p>
              </div>
            </a>

            <a
              href="#"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-secondary hover:bg-card transition-all group"
            >
              <Zap className="w-5 h-5 text-secondary group-hover:text-accent flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">Example Pipelines</h4>
                <p className="text-sm text-foreground/60">Ready-to-use pipeline examples</p>
              </div>
            </a>

            <a
              href="#"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-secondary hover:bg-card transition-all group"
            >
              <Shield className="w-5 h-5 text-secondary group-hover:text-accent flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">Discord Community</h4>
                <p className="text-sm text-foreground/60">Get help from developers</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
