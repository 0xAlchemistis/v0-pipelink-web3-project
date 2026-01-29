'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import * as nacl from 'tweetnacl';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, CheckCircle2, Copy, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const connection = new Connection('https://api.mainnet-beta.solana.com');

export default function DAppPage() {
  const wallet = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [messageToSign] = useState('Sign to authenticate and view your SOL balance on PIPELINK');

  // Fetch balance
  useEffect(() => {
    if (!wallet.publicKey) {
      setBalance(null);
      return;
    }

    const fetchBalance = async () => {
      try {
        const lamports = await connection.getBalance(wallet.publicKey!);
        setBalance(lamports / LAMPORTS_PER_SOL);
      } catch (err) {
        setError('Failed to fetch balance');
      }
    };

    fetchBalance();
    const interval = setInterval(fetchBalance, 10000);
    return () => clearInterval(interval);
  }, [wallet.publicKey]);

  // Handle sign message
  const handleSignMessage = useCallback(async () => {
    if (!wallet.publicKey || !wallet.signMessage) {
      setError('Wallet not connected');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const message = new TextEncoder().encode(messageToSign);
      const sig = await wallet.signMessage(message);
      const signatureString = Array.from(sig).map(b => b.toString(16).padStart(2, '0')).join('');
      setSignature(signatureString.substring(0, 32) + '...');
    } catch (err) {
      setError('Failed to sign message');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [wallet, messageToSign]);

  const handleCopyAddress = () => {
    if (wallet.publicKey) {
      navigator.clipboard.writeText(wallet.publicKey.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5" />
            <div className="flex items-center gap-2">
              <Image 
                src="/pipelink-logo.png" 
                alt="PIPELINK Logo" 
                width={32} 
                height={32}
                className="rounded-lg"
              />
              <span className="font-bold">PIPELINK</span>
            </div>
          </Link>
          <WalletMultiButton className="bg-primary hover:bg-primary/90 text-primary-foreground" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!wallet.connected ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Card className="bg-card border-border p-12 text-center max-w-md">
              <AlertCircle className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
              <p className="text-muted-foreground mb-8">
                Please connect a Solana wallet to access the PIPELINK dashboard.
              </p>
              <p className="text-sm text-muted-foreground">
                Supported wallets: Phantom, Solflare
              </p>
            </Card>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Dashboard Header */}
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {wallet.publicKey?.toString().substring(0, 8)}...</p>
            </div>

            {/* Main Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Wallet Info Card */}
              <Card className="bg-card border-border p-8">
                <h2 className="text-xl font-bold mb-6 text-secondary">Wallet Information</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">Public Key</p>
                    <div className="bg-muted/50 border border-border rounded-lg p-3 flex items-center justify-between">
                      <code className="text-xs sm:text-sm text-foreground font-mono truncate">
                        {wallet.publicKey?.toString()}
                      </code>
                      <button
                        onClick={handleCopyAddress}
                        className="ml-2 p-1.5 hover:bg-border rounded transition-colors flex-shrink-0"
                      >
                        <Copy className={`w-4 h-4 ${copied ? 'text-accent' : 'text-secondary'}`} />
                      </button>
                    </div>
                    {copied && <p className="text-accent text-xs mt-1">Copied!</p>}
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">Network</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-sm font-medium">Solana Mainnet</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* SOL Balance Card */}
              <Card className="bg-card border-border p-8">
                <h2 className="text-xl font-bold mb-6 text-secondary">Wallet Balance</h2>
                <div className="space-y-4">
                  {balance !== null ? (
                    <>
                      <div>
                        <p className="text-muted-foreground text-sm mb-2">SOL Balance</p>
                        <div className="text-3xl font-bold text-accent">
                          {balance.toFixed(4)} SOL
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          ≈ ${(balance * 200).toFixed(2)} USD
                        </p>
                      </div>
                      <div className="pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground">Last updated: just now</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-secondary animate-spin" />
                      <span className="text-sm text-muted-foreground">Loading balance...</span>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Signature Card */}
            <Card className="bg-card border-border p-8">
              <h2 className="text-xl font-bold mb-6 text-secondary">Message Signing</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Message</p>
                  <div className="bg-muted/50 border border-border rounded-lg p-3">
                    <p className="text-sm">{messageToSign}</p>
                  </div>
                </div>
                <Button
                  onClick={handleSignMessage}
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing...
                    </>
                  ) : (
                    'Sign Message'
                  )}
                </Button>
                {signature && (
                  <div className="bg-accent/10 border border-accent rounded-lg p-3 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Message Signed</p>
                      <code className="text-xs text-muted-foreground">
                        {signature}
                      </code>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Pipelines Section */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Create Pipeline */}
              <Card className="bg-card border-border p-8">
                <h2 className="text-xl font-bold mb-6 text-secondary">Create Pipeline</h2>
                <p className="text-muted-foreground mb-6">
                  Start building your first on-chain pipeline. Link modules and create execution workflows.
                </p>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  New Pipeline
                </Button>
              </Card>

              {/* Active Pipelines */}
              <Card className="bg-card border-border p-8">
                <h2 className="text-xl font-bold mb-6 text-secondary">Active Pipelines</h2>
                <div className="space-y-3">
                  <p className="text-muted-foreground text-sm">
                    No active pipelines yet. Create your first pipeline to get started.
                  </p>
                </div>
              </Card>
            </div>

            {/* Execution History */}
            <Card className="bg-card border-border p-8">
              <h2 className="text-xl font-bold mb-6 text-secondary">Execution History</h2>
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📋</span>
                  </div>
                  <p className="text-muted-foreground">No executions yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create and run pipelines to see execution history
                  </p>
                </div>
              </div>
            </Card>

            {error && (
              <div className="bg-destructive/10 border border-destructive rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-destructive">Error</p>
                  <p className="text-sm text-destructive/80">{error}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
