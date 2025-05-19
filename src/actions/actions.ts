'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function createMemo(formData: FormData) {
  const session = await auth();

  await prisma.memo.create({
    data: {
      title: formData.get('title') as string,
      userId: session?.user.id,
    },
  });
}
