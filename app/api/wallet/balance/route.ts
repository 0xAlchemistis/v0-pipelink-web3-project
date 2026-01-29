import { Connection, PublicKey } from '@solana/web3.js';
import { NextRequest, NextResponse } from 'next/server';

const connection = new Connection('https://api.mainnet-beta.solana.com');

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json(
        { error: 'Missing address parameter' },
        { status: 400 }
      );
    }

    // Validate address format
    let publicKey: PublicKey;
    try {
      publicKey = new PublicKey(address);
    } catch {
      return NextResponse.json(
        { error: 'Invalid address format' },
        { status: 400 }
      );
    }

    // Fetch balance
    const lamports = await connection.getBalance(publicKey);
    const balance = lamports / 1e9; // Convert to SOL

    return NextResponse.json({
      success: true,
      address,
      balance,
      lamports,
      unit: 'SOL',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Balance fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch balance' },
      { status: 500 }
    );
  }
}
