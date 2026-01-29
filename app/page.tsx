'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Copy, Github, BookOpen, Zap, Code, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('DZRJ5tk6G3MVEynkS5EV6fe4uNBVYKEAovdVwNFHpump');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image 
              src="/pipelink-logo.png" 
              alt="PIPELINK Logo" 
              width={40} 
              height={40}
              className="rounded-lg"
            />
            <span className="text-xl font-bold">PIPELINK</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/docs" className="text-sm hover:text-secondary transition-colors">Documentation</a>
            <a href="/app" className="text-sm hover:text-secondary transition-colors">App</a>
            <a href="https://github.com/pipelinktech/pipelink-sdk" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-secondary transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(102, 102, 255, 0.05) 25%, rgba(102, 102, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(102, 102, 255, 0.05) 75%, rgba(102, 102, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(102, 102, 255, 0.05) 25%, rgba(102, 102, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(102, 102, 255, 0.05) 75%, rgba(102, 102, 255, 0.05) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-secondary opacity-20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 text-balance">
            PIPELINK
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            <span className="text-secondary">Link the Logic.</span> <span className="text-accent">Execute On-Chain.</span>
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            PIPELINK is a decentralized pipeline infrastructure enabling modular, on-chain execution workflows on Solana.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href="/app">Launch App</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 bg-transparent">
              <a href="/docs">Read Documentation</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Contract Address Section */}
      <section className="py-16 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Contract Address</h2>
          <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
            <code className="text-secondary font-mono text-sm sm:text-base overflow-x-auto">
              DZRJ5tk6G3MVEynkS5EV6fe4uNBVYKEAovdVwNFHpump
            </code>
            <button
              onClick={handleCopyAddress}
              className="ml-4 p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Copy className={`w-4 h-4 ${copied ? 'text-accent' : 'text-secondary'}`} />
            </button>
          </div>
          {copied && <p className="text-accent text-sm mt-2 text-center">Copied!</p>}
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Zap, title: 'DeFi Automation', desc: 'DCA, Auto Swap, Arbitrage' },
              { icon: Code, title: 'Bot & Workflow Automation', desc: 'Modular execution logic' },
              { icon: Rocket, title: 'NFT & Gaming Pipelines', desc: 'On-chain game mechanics' },
              { icon: BookOpen, title: 'Developer SDK', desc: 'Backend-less execution' },
            ].map((item, i) => (
              <Card key={i} className="bg-card border-border p-6 hover:border-secondary/50 transition-colors">
                <item.icon className="w-8 h-8 text-secondary mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {['Create Pipe', 'Link Modules', 'Route Logic', 'Execute On-Chain'].map((step, i) => (
              <div key={i} className="flex items-center flex-1 gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-primary-foreground flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold">{step}</p>
                </div>
                {i < 3 && <div className="hidden sm:block w-8 h-0.5 bg-gradient-to-r from-secondary to-transparent"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Roadmap</h2>
          <div className="space-y-6">
            {[
              { phase: 'Phase 1', title: 'Core Pipeline Engine & SDK', status: 'In Development' },
              { phase: 'Phase 2', title: 'Executor Network & Staking', status: 'Coming Soon' },
              { phase: 'Phase 3', title: 'DAO Governance & Pipeline Marketplace', status: 'Planned' },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-secondary">{item.phase}</h3>
                    <p className="font-semibold mt-1">{item.title}</p>
                  </div>
                  <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Token Utility */}
      <section className="py-20 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">$PIPELINK Token Utility</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Execution Fees', desc: 'Pay for on-chain pipeline executions' },
              { title: 'Staking', desc: 'Stake tokens to secure the network' },
              { title: 'Governance', desc: 'Vote on protocol updates and changes' },
              { title: 'Executor Bonding', desc: 'Bond tokens to become an executor' },
            ].map((item, i) => (
              <Card key={i} className="bg-card border-border p-6">
                <h3 className="text-lg font-bold text-accent mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image 
                  src="/pipelink-logo.png" 
                  alt="PIPELINK Logo" 
                  width={32} 
                  height={32}
                  className="rounded-lg"
                />
                <span className="font-bold">PIPELINK</span>
              </div>
              <p className="text-sm text-muted-foreground">Link the Logic. Execute On-Chain.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/docs" className="hover:text-secondary transition-colors">Documentation</a></li>
                <li><a href="/app" className="hover:text-secondary transition-colors">App</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://github.com/pipelinktech/pipelink-sdk" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">GitHub</a></li>
                <li><a href="https://x.com/PipelinkTech" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">X/Twitter</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-secondary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2026 PIPELINK. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
