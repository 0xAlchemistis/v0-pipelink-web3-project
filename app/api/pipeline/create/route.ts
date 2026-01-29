import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage for demo purposes
// In production, this would be a database
const pipelines: Record<string, any> = {};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, owner } = body;

    if (!owner) {
      return NextResponse.json(
        { error: 'Missing owner field' },
        { status: 400 }
      );
    }

    // Generate pipeline ID
    const pipelineId = `pipeline_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Store pipeline
    const pipeline = {
      id: pipelineId,
      name: name || 'Untitled Pipeline',
      description: description || '',
      owner,
      status: 'created',
      modules: [],
      links: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    pipelines[pipelineId] = pipeline;

    return NextResponse.json({
      success: true,
      pipelineId,
      status: 'created',
      pipeline,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Pipeline creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create pipeline' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const owner = searchParams.get('owner');

    if (!owner) {
      return NextResponse.json(
        { error: 'Missing owner parameter' },
        { status: 400 }
      );
    }

    // Filter pipelines by owner
    const userPipelines = Object.values(pipelines).filter(p => p.owner === owner);

    return NextResponse.json({
      success: true,
      owner,
      pipelines: userPipelines,
      count: userPipelines.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Pipeline fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pipelines' },
      { status: 500 }
    );
  }
}
