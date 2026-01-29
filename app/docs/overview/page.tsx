'use client';

import Link from 'next/link';
import { ChevronDown, BookOpen, Zap, Shield, Code2 } from 'lucide-react';

export default function OverviewPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 text-secondary hover:text-accent transition-colors mb-4"
          >
            <ChevronDown className="w-4 h-4 rotate-90" />
            Back to Documentation
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Overview</h1>
          </div>
          <p className="text-lg text-foreground/70">
            Learn about PIPELINK and understand its core architecture and capabilities.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* What is PIPELINK */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">What is PIPELINK?</h2>
            <p className="text-foreground/80">
              PIPELINK is a decentralized pipeline infrastructure protocol built on Solana that enables modular, 
              on-chain execution workflows. It allows developers to create, compose, and execute complex transaction 
              pipelines with a focus on security, efficiency, and composability.
            </p>
            <p className="text-foreground/80">
              Think of PIPELINK as a choreographer for blockchain transactions - it orchestrates multiple instructions 
              and programs in a coordinated manner, ensuring they execute in the correct sequence with proper error handling 
              and state management.
            </p>
          </section>

          {/* Key Features */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Zap className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <h3 className="font-semibold text-foreground">Modular Architecture</h3>
                </div>
                <p className="text-sm text-foreground/70">
                  Compose pipelines from reusable components. Mix and match different instruction types to build custom workflows.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Shield className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <h3 className="font-semibold text-foreground">Atomic Execution</h3>
                </div>
                <p className="text-sm text-foreground/70">
                  All-or-nothing transaction semantics. Either the entire pipeline executes successfully or all changes are rolled back.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Code2 className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <h3 className="font-semibold text-foreground">Cross-Program Composition</h3>
                </div>
                <p className="text-sm text-foreground/70">
                  Seamless integration with any Solana program. Call multiple programs within a single pipeline without complexity.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <BookOpen className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <h3 className="font-semibold text-foreground">Developer Friendly</h3>
                </div>
                <p className="text-sm text-foreground/70">
                  Simple SDK and TypeScript support with comprehensive documentation and example pipelines.
                </p>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Use Cases</h2>
            <div className="space-y-3">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">DeFi Automation</h3>
                <p className="text-sm text-foreground/70">
                  Automate complex trading strategies, arbitrage opportunities, and liquidity management across multiple protocols.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">Bot Automation</h3>
                <p className="text-sm text-foreground/70">
                  Build autonomous bots that execute pre-defined workflows triggered by on-chain or off-chain events.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">NFT Pipelines</h3>
                <p className="text-sm text-foreground/70">
                  Create sophisticated NFT workflows including minting, listing, trading, and royalty distributions.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">Custom Integrations</h3>
                <p className="text-sm text-foreground/70">
                  Integrate any Solana program into your applications with minimal overhead and maximum flexibility.
                </p>
              </div>
            </div>
          </section>

          {/* Architecture */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Architecture Overview</h2>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-foreground/80 mb-4">
                PIPELINK consists of three main components:
              </p>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-semibold text-secondary mb-1">On-Chain Program</h4>
                  <p className="text-foreground/70">
                    The core Solana program that manages pipeline execution, state verification, and instruction processing.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary mb-1">SDK (TypeScript/Rust)</h4>
                  <p className="text-foreground/70">
                    Developer-friendly libraries for building and executing pipelines with type safety and easy integration.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary mb-1">Frontend Dashboard</h4>
                  <p className="text-foreground/70">
                    Web-based interface for managing wallets, creating pipelines, and monitoring execution history.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Getting Started CTA */}
          <section className="pt-8 border-t border-border">
            <div className="flex gap-4">
              <Link
                href="/docs/getting-started"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Get Started
                <ChevronDown className="w-4 h-4 rotate-90" />
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-semibold hover:bg-card transition-colors"
              >
                Back to Docs
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
