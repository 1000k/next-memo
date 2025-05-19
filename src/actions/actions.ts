'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export async function create(formData: FormData) {
  const session = await auth();

  await prisma.memo.create({
    data: {
      title: formData.get('title') as string,
      userId: session?.user.id,
    },
  });

  revalidatePath('/memo');
}
