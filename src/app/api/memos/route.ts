import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user?.externalUserId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const memos = await prisma.memo.findMany({
      where: {
        externalUserId: session.user.externalUserId,
      },
      orderBy: {
        order: 'asc',
      },
    });

    return NextResponse.json(memos);
  } catch (error) {
    console.error('Error fetching memos:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 