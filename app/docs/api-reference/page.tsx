'use client';

import Link from 'next/link';
import { ChevronDown, Code2 } from 'lucide-react';

export default function ApiReferencePage() {
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
            <div className="p-3 bg-accent/10 rounded-lg">
              <Code2 className="w-6 h-6 text-accent" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">API Reference</h1>
          </div>
          <p className="text-lg text-foreground/70">
            Complete API documentation and reference for PIPELINK SDK and backend services.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* PipelineBuilder */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">PipelineBuilder</h2>
            <p className="text-foreground/80">
              Main class for creating and managing execution pipelines. Provides a fluent API for composing pipeline steps.
            </p>

            <div className="space-y-3">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-mono text-secondary mb-3">constructor(connection: Connection)</h3>
                <p className="text-sm text-foreground/70 mb-3">
                  Creates a new PipelineBuilder instance connected to the specified Solana network.
                </p>
                <div className="bg-muted p-3 rounded text-xs font-mono space-y-1 text-foreground/60">
                  <div>
                    <span className="text-accent">const</span> builder = <span className="text-secondary">new</span> PipelineBuilder(connection);
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-mono text-secondary mb-3">addStep(name: string, config: object): PipelineBuilder</h3>
                <p className="text-sm text-foreground/70 mb-3">
                  Adds a step to the pipeline. Returns the builder for chaining.
                </p>
                <div className="bg-muted p-3 rounded text-xs font-mono space-y-1 text-foreground/60">
                  <div>builder.addStep(<span className="text-accent">'swap'</span>, {'{}'}</div>
                  <div className="ml-4">tokenA: <span className="text-accent">'SOL'</span>,</div>
                  <div className="ml-4">tokenB: <span className="text-accent">'USDC'</span>,</div>
                  <div className="ml-4">amount: <span className="text-primary">1000000</span></div>
                  <div>{'}'});</div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-mono text-secondary mb-3">addCondition(condition: Condition): PipelineBuilder</h3>
                <p className="text-sm text-foreground/70 mb-3">
                  Adds a conditional check to the pipeline execution flow.
                </p>
                <div className="bg-muted p-3 rounded text-xs font-mono space-y-1 text-foreground/60">
                  <div>builder.addCondition({'{}'}</div>
                  <div className="ml-4">field: <span className="text-accent">'balance'</span>,</div>
                  <div className="ml-4">operator: <span className="text-accent">'&gt;='</span>,</div>
                  <div className="ml-4">value: <span className="text-primary">1000000</span></div>
                  <div>{'}'});</div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-mono text-secondary mb-3">build(): Pipeline</h3>
                <p className="text-sm text-foreground/70 mb-3">
                  Builds and validates the pipeline configuration. Must be called before execution.
                </p>
                <div className="bg-muted p-3 rounded text-xs font-mono space-y-1 text-foreground/60">
                  <div>
                    <span className="text-accent">const</span> pipeline = builder.build();
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-mono text-secondary mb-3">execute(signer: Keypair): Promise&lt;string&gt;</h3>
                <p className="text-sm text-foreground/70 mb-3">
                  Executes the pipeline on the blockchain. Returns the transaction signature.
                </p>
                <div className="bg-muted p-3 rounded text-xs font-mono space-y-1 text-foreground/60">
                  <div>
                    <span className="text-accent">const</span> signature = <span className="text-accent">await</span> pipeline.execute(keypair);
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step Interface */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Step Interface</h2>
            <p className="text-foreground/80">
              Definition for individual pipeline steps that are executed in sequence.
            </p>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-xs font-mono space-y-2 text-foreground/60">
                <div>
                  <span className="text-accent">interface</span> <span className="text-secondary">Step</span> {'{'}
                </div>
                <div className="ml-4">name: <span className="text-primary">string</span>;</div>
                <div className="ml-4">program: <span className="text-primary">PublicKey</span>;</div>
                <div className="ml-4">accounts: <span className="text-primary">AccountMeta</span>[];</div>
                <div className="ml-4">data: <span className="text-primary">Buffer</span>;</div>
                <div className="ml-4">signers?: <span className="text-primary">Keypair</span>[];</div>
                <div>{'}'}</div>
              </div>
            </div>
          </section>

          {/* Backend API */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Backend API Endpoints</h2>
            <p className="text-foreground/80">
              REST API endpoints for server-side operations and integrations.
            </p>

            <div className="space-y-3">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-mono rounded">POST</span>
                  <span className="font-mono text-secondary">/api/auth/verify</span>
                </div>
                <p className="text-sm text-foreground/70 mb-3">
                  Verify a signed message to authenticate a wallet.
                </p>
                <div className="bg-muted p-3 rounded text-xs space-y-2">
                  <div className="text-foreground/70">
                    <span className="font-semibold text-foreground">Request Body:</span>
                  </div>
                  <div className="font-mono text-foreground/60">
                    <div>{'{'}</div>
                    <div className="ml-4">"message": <span className="text-accent">"string"</span>,</div>
                    <div className="ml-4">"signature": <span className="text-accent">"string"</span>,</div>
                    <div className="ml-4">"publicKey": <span className="text-accent">"string"</span></div>
                    <div>{'}'}</div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-secondary/20 text-secondary text-xs font-mono rounded">GET</span>
                  <span className="font-mono text-secondary">/api/wallet/balance</span>
                </div>
                <p className="text-sm text-foreground/70 mb-3">
                  Get the SOL balance for a wallet address.
                </p>
                <div className="bg-muted p-3 rounded text-xs space-y-2">
                  <div className="text-foreground/70">
                    <span className="font-semibold text-foreground">Query Parameters:</span>
                  </div>
                  <div className="font-mono text-foreground/60">
                    <div>address: <span className="text-accent">string</span> (required)</div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-accent/20 text-accent text-xs font-mono rounded">POST</span>
                  <span className="font-mono text-secondary">/api/pipeline/create</span>
                </div>
                <p className="text-sm text-foreground/70 mb-3">
                  Create and store a new pipeline configuration.
                </p>
                <div className="bg-muted p-3 rounded text-xs space-y-2">
                  <div className="text-foreground/70">
                    <span className="font-semibold text-foreground">Request Body:</span>
                  </div>
                  <div className="font-mono text-foreground/60">
                    <div>{'{'}</div>
                    <div className="ml-4">"name": <span className="text-accent">"string"</span>,</div>
                    <div className="ml-4">"owner": <span className="text-accent">"string"</span>,</div>
                    <div className="ml-4">"steps": <span className="text-accent">"Step[]"</span></div>
                    <div>{'}'}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Error Codes */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Error Codes</h2>
            <p className="text-foreground/80">
              Common error codes returned by the API.
            </p>

            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h4 className="font-mono text-destructive text-sm mb-1">INSUFFICIENT_FUNDS</h4>
                  <p className="text-xs text-foreground/70">Wallet has insufficient balance to complete the transaction.</p>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <h4 className="font-mono text-destructive text-sm mb-1">INVALID_SIGNATURE</h4>
                  <p className="text-xs text-foreground/70">The provided signature is invalid or malformed.</p>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <h4 className="font-mono text-destructive text-sm mb-1">PROGRAM_FAILED</h4>
                  <p className="text-xs text-foreground/70">The Solana program returned an error during execution.</p>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <h4 className="font-mono text-destructive text-sm mb-1">INVALID_ACCOUNT</h4>
                  <p className="text-xs text-foreground/70">One or more accounts in the transaction are invalid.</p>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <h4 className="font-mono text-destructive text-sm mb-1">NETWORK_ERROR</h4>
                  <p className="text-xs text-foreground/70">Network connectivity issue or RPC endpoint error.</p>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <h4 className="font-mono text-destructive text-sm mb-1">TIMEOUT</h4>
                  <p className="text-xs text-foreground/70">Transaction confirmation timeout exceeded.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section className="pt-8 border-t border-border">
            <div className="flex gap-4">
              <Link
                href="/docs/security"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Security Best Practices
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
