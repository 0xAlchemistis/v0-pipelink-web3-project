'use client';

import Link from 'next/link';
import { ChevronDown, Zap, Copy, Check } from 'lucide-react';
import { useState } from 'react';

function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-muted rounded-lg overflow-hidden">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 hover:bg-muted/80 rounded transition-colors"
      >
        {copied ? (
          <Check className="w-4 h-4 text-accent" />
        ) : (
          <Copy className="w-4 h-4 text-foreground/60" />
        )}
      </button>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-foreground/80">{code}</code>
      </pre>
    </div>
  );
}

export default function GettingStartedPage() {
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
            <div className="p-3 bg-secondary/10 rounded-lg">
              <Zap className="w-6 h-6 text-secondary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Getting Started</h1>
          </div>
          <p className="text-lg text-foreground/70">
            Set up your development environment and create your first pipeline.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Installation */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Installation</h2>
            <p className="text-foreground/80">
              Install the PIPELINK SDK and required dependencies using npm or yarn.
            </p>
            <CodeBlock code="npm install @pipelink/sdk @solana/web3.js tweetnacl" />
          </section>

          {/* Prerequisites */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Prerequisites</h2>
            <div className="space-y-3">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Node.js</h3>
                <p className="text-sm text-foreground/70">Version 16 or higher is required.</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Solana CLI</h3>
                <p className="text-sm text-foreground/70">
                  Install from{' '}
                  <a href="#" className="text-secondary hover:text-accent">
                    solana.com
                  </a>
                  {' '}(optional but recommended)
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Wallet</h3>
                <p className="text-sm text-foreground/70">
                  Phantom, Solflare, or another Solana-compatible wallet for testing.
                </p>
              </div>
            </div>
          </section>

          {/* Basic Usage */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Basic Usage</h2>
            <p className="text-foreground/80">
              Here's a simple example to get you started with PIPELINK.
            </p>
            <CodeBlock
              code={`import { PipelineBuilder } from '@pipelink/sdk';
import { Connection, Keypair } from '@solana/web3.js';

// Initialize connection
const connection = new Connection('https://api.mainnet-beta.solana.com');
const keypair = Keypair.generate();

// Create a pipeline
const pipeline = new PipelineBuilder(connection)
  .addStep('swap', { 
    tokenA: 'SOL', 
    tokenB: 'USDC',
    amount: 1000000 // in lamports
  })
  .addStep('stake', { 
    amount: 500000,
    duration: 30 // days
  })
  .build();

// Execute the pipeline
try {
  const signature = await pipeline.execute(keypair);
  console.log('Pipeline executed:', signature);
} catch (error) {
  console.error('Pipeline failed:', error);
}`}
              language="typescript"
            />
          </section>

          {/* Step by Step */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Step-by-Step Guide</h2>
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Initialize Connection</h3>
                    <p className="text-sm text-foreground/70 mb-3">
                      Create a Solana connection to the network (mainnet, devnet, or testnet).
                    </p>
                    <CodeBlock code={`const connection = new Connection('https://api.mainnet-beta.solana.com');`} />
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Create Pipeline Builder</h3>
                    <p className="text-sm text-foreground/70 mb-3">
                      Instantiate a new PipelineBuilder with your connection.
                    </p>
                    <CodeBlock code={`const pipeline = new PipelineBuilder(connection);`} />
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Add Steps</h3>
                    <p className="text-sm text-foreground/70 mb-3">
                      Add individual steps to your pipeline using the addStep method.
                    </p>
                    <CodeBlock
                      code={`pipeline
  .addStep('swap', { tokenA: 'SOL', tokenB: 'USDC', amount: 1000000 })
  .addStep('stake', { amount: 500000 });`}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Build and Execute</h3>
                    <p className="text-sm text-foreground/70 mb-3">
                      Build the pipeline and execute it with your keypair.
                    </p>
                    <CodeBlock code={`const builtPipeline = pipeline.build();
const signature = await builtPipeline.execute(keypair);`} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Common Patterns */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Common Patterns</h2>
            
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-3">Conditional Execution</h3>
                <p className="text-sm text-foreground/70 mb-3">
                  Execute different steps based on conditions.
                </p>
                <CodeBlock
                  code={`const pipeline = new PipelineBuilder(connection)
  .addStep('check_balance', { minimum: 1000000 })
  .addCondition({
    field: 'balance',
    operator: '>=',
    value: 1000000
  })
  .addStep('execute_trade', { amount: 500000 });`}
                />
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-3">Error Handling</h3>
                <p className="text-sm text-foreground/70 mb-3">
                  Handle errors gracefully in your pipelines.
                </p>
                <CodeBlock
                  code={`try {
  const signature = await pipeline.execute(keypair);
  console.log('Success:', signature);
} catch (error) {
  if (error.code === 'INSUFFICIENT_FUNDS') {
    console.log('Not enough SOL');
  } else if (error.code === 'PROGRAM_FAILED') {
    console.log('Instruction failed:', error.message);
  }
}`}
                />
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section className="pt-8 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">Next Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Link
                href="/docs/api-reference"
                className="block p-4 border border-border rounded-lg hover:border-secondary hover:bg-card/50 transition-all group"
              >
                <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors">
                  API Reference
                </h3>
                <p className="text-sm text-foreground/70">Explore all available APIs and methods</p>
              </Link>

              <Link
                href="/docs/security"
                className="block p-4 border border-border rounded-lg hover:border-secondary hover:bg-card/50 transition-all group"
              >
                <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors">
                  Security Best Practices
                </h3>
                <p className="text-sm text-foreground/70">Learn how to secure your applications</p>
              </Link>
            </div>

            <div className="flex gap-4">
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
