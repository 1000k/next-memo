import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const memos = await prisma.memo.findMany();
  return NextResponse.json(memos);
}

export async function POST(request: Request) {
  const data = await request.json();
  const memo = await prisma.memo.create({ data });
  return NextResponse.json(memo);
}
