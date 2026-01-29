'use client';

import Link from 'next/link';
import { ChevronDown, Shield, AlertCircle } from 'lucide-react';

function CodeBlock({ code, language = 'typescript' }: { code: string; language?: string }) {
  return (
    <div className="bg-muted rounded-lg overflow-hidden">
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-foreground/80">{code}</code>
      </pre>
    </div>
  );
}

export default function SecurityPage() {
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
            <div className="p-3 bg-purple-400/10 rounded-lg">
              <Shield className="w-6 h-6 text-purple-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Security</h1>
          </div>
          <p className="text-lg text-foreground/70">
            Best practices and security guidelines for building secure applications with PIPELINK.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Security Overview */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Security Overview</h2>
            <p className="text-foreground/80">
              PIPELINK is built with security as a core principle. However, developers must follow best practices when 
              integrating PIPELINK into their applications to ensure maximum safety.
            </p>
          </section>

          {/* Critical Security Practices */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Critical Security Practices</h2>

            <div className="space-y-4">
              <div className="border-l-4 border-destructive bg-card/50 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-foreground">Never Share Private Keys</h3>
                </div>
                <p className="text-sm text-foreground/70 mb-3">
                  Private keys are the root of all security. Never expose them in logs, frontend code, environment variables, 
                  or transmit them over insecure connections.
                </p>
                <CodeBlock
                  code={`// ❌ DO NOT DO THIS
const privateKey = process.env.PRIVATE_KEY; // Exposed in logs
localStorage.setItem('key', privateKey); // Client-side storage

// ✅ DO THIS INSTEAD
const keypair = Keypair.fromSecretKey(secretKeyBytes);
// Store secrets only in secure backend systems`}
                />
              </div>

              <div className="border-l-4 border-destructive bg-card/50 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-foreground">Always Verify Wallet Ownership</h3>
                </div>
                <p className="text-sm text-foreground/70 mb-3">
                  Before executing any transaction or sensitive operation, verify that the user owns the wallet they claim to own.
                </p>
                <CodeBlock
                  code={`import nacl from 'tweetnacl';

function verifySignature(message, signature, publicKey) {
  try {
    const messageBytes = new TextEncoder().encode(message);
    const signatureBytes = Buffer.from(signature, 'hex');
    const pubKeyBytes = Buffer.from(publicKey, 'base58');
    
    return nacl.sign.detached.verify(
      messageBytes,
      signatureBytes,
      pubKeyBytes
    );
  } catch (error) {
    return false;
  }
}`}
                />
              </div>

              <div className="border-l-4 border-destructive bg-card/50 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-foreground">Validate All Accounts and Programs</h3>
                </div>
                <p className="text-sm text-foreground/70 mb-3">
                  Before including accounts in a pipeline step, verify they are the correct accounts and belong to the expected programs.
                </p>
                <CodeBlock
                  code={`// ✅ Validate program ownership and account addresses
const expectedProgramId = new PublicKey('TokenkegQfeZyiNwAJsyFbPVwwQQfփ');
const userProvidedProgram = new PublicKey(userInput.programId);

if (!userProvidedProgram.equals(expectedProgramId)) {
  throw new Error('Invalid program address');
}

// Verify account ownership
if (!account.owner.equals(expectedProgramId)) {
  throw new Error('Account owned by wrong program');
}`}
                />
              </div>
            </div>
          </section>

          {/* Signature Verification */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Signature Verification</h2>
            <p className="text-foreground/80">
              PIPELINK uses Ed25519 signature verification for wallet authentication. Understand how signatures work to implement proper verification.
            </p>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">How Signatures Work</h3>
              <div className="space-y-3 text-sm text-foreground/70">
                <div>
                  <strong className="text-foreground">1. Message Creation:</strong> The user creates a message they want to sign.
                </div>
                <div>
                  <strong className="text-foreground">2. Signing:</strong> The wallet signs the message using the user's private key.
                </div>
                <div>
                  <strong className="text-foreground">3. Verification:</strong> The server verifies the signature using the public key.
                </div>
                <div>
                  <strong className="text-foreground">4. Authentication:</strong> If valid, the user is authenticated.
                </div>
              </div>
            </div>

            <CodeBlock
              code={`// Client-side: Sign a message with Phantom
const message = new TextEncoder().encode('Sign in to PIPELINK');
const { signature } = await window.solana.signMessage(message);

// Server-side: Verify the signature
import nacl from 'tweetnacl';

function verifyMessage(message, signature, publicKeyBase58) {
  const messageBytes = new TextEncoder().encode(message);
  const signatureBytes = new Uint8Array(signature);
  const publicKeyBytes = bs58.decode(publicKeyBase58);
  
  return nacl.sign.detached.verify(
    messageBytes,
    signatureBytes,
    publicKeyBytes
  );
}`}
            />
          </section>

          {/* Backend Security */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Backend Security</h2>

            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-3">Rate Limiting</h3>
                <p className="text-sm text-foreground/70 mb-3">
                  Implement rate limiting on all API endpoints to prevent abuse and DDoS attacks.
                </p>
                <CodeBlock
                  code={`import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later'
});

app.post('/api/pipeline/create', limiter, async (req, res) => {
  // Your handler code
});`}
                />
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-3">Input Validation</h3>
                <p className="text-sm text-foreground/70 mb-3">
                  Always validate and sanitize user input before processing.
                </p>
                <CodeBlock
                  code={`import { z } from 'zod';

const PipelineSchema = z.object({
  name: z.string().min(1).max(100),
  owner: z.string().regex(/^[1-9A-HJ-NP-Z]{32,34}$/), // Solana address
  steps: z.array(z.object({
    name: z.string(),
    amount: z.number().positive()
  }))
});

// Validate incoming request
const result = PipelineSchema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({ error: result.error });
}`}
                />
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-3">HTTPS Only</h3>
                <p className="text-sm text-foreground/70 mb-3">
                  Always use HTTPS for all API communication. Never transmit sensitive data over HTTP.
                </p>
                <CodeBlock
                  code={`// ✅ HTTPS endpoints only
const apiUrl = 'https://api.yourapp.com';

// ❌ NEVER use HTTP for sensitive operations
const apiUrl = 'http://api.yourapp.com'; // Insecure!`}
                />
              </div>
            </div>
          </section>

          {/* Common Vulnerabilities */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Common Vulnerabilities to Avoid</h2>

            <div className="space-y-3">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Replay Attacks</h3>
                <p className="text-sm text-foreground/70">
                  Include a nonce or timestamp in signed messages to prevent replay attacks.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Front-Running</h3>
                <p className="text-sm text-foreground/70">
                  Use Solana's recent blockhash and transaction priority to mitigate front-running risks.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Account Takeover</h3>
                <p className="text-sm text-foreground/70">
                  Implement multi-signature requirements for critical operations and use hardware wallets for key storage.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Insufficient Authorization</h3>
                <p className="text-sm text-foreground/70">
                  Always verify that the user has permission to execute requested operations before processing.
                </p>
              </div>
            </div>
          </section>

          {/* Audit Checklist */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Pre-Mainnet Audit Checklist</h2>
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 bg-card rounded-lg border border-border">
                <input type="checkbox" className="mt-1" disabled />
                <span className="text-sm text-foreground/70">All private keys are stored securely server-side</span>
              </div>

              <div className="flex items-start gap-3 p-3 bg-card rounded-lg border border-border">
                <input type="checkbox" className="mt-1" disabled />
                <span className="text-sm text-foreground/70">Signature verification is implemented correctly</span>
              </div>

              <div className="flex items-start gap-3 p-3 bg-card rounded-lg border border-border">
                <input type="checkbox" className="mt-1" disabled />
                <span className="text-sm text-foreground/70">All user inputs are validated and sanitized</span>
              </div>

              <div className="flex items-start gap-3 p-3 bg-card rounded-lg border border-border">
                <input type="checkbox" className="mt-1" disabled />
                <span className="text-sm text-foreground/70">Rate limiting is implemented on all endpoints</span>
              </div>

              <div className="flex items-start gap-3 p-3 bg-card rounded-lg border border-border">
                <input type="checkbox" className="mt-1" disabled />
                <span className="text-sm text-foreground/70">HTTPS is enforced for all connections</span>
              </div>

              <div className="flex items-start gap-3 p-3 bg-card rounded-lg border border-border">
                <input type="checkbox" className="mt-1" disabled />
                <span className="text-sm text-foreground/70">Error messages don't expose sensitive information</span>
              </div>

              <div className="flex items-start gap-3 p-3 bg-card rounded-lg border border-border">
                <input type="checkbox" className="mt-1" disabled />
                <span className="text-sm text-foreground/70">Smart contracts have been audited by professionals</span>
              </div>

              <div className="flex items-start gap-3 p-3 bg-card rounded-lg border border-border">
                <input type="checkbox" className="mt-1" disabled />
                <span className="text-sm text-foreground/70">Logging and monitoring are in place for suspicious activities</span>
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section className="pt-8 border-t border-border">
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
