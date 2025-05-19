'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export async function findById(id: number) {
  const result = await prisma.memo.findUnique({
    where: {
      id: id,
    },
  });
  return result;
}

export async function create(formData: FormData) {
  const session = await auth();

  if (!session?.user?.externalUserId) {
    throw new Error('User not found');
  }

  await prisma.memo.create({
    data: {
      title: formData.get('title') as string,
      externalUserId: session.user.externalUserId,
    },
  });

  revalidatePath('/memo');
}

export async function update(formData: FormData) {
  const session = await auth();
  const oldMemo = await findById(Number(formData.get('id')));

  if (!oldMemo) {
    throw new Error('Memo not found');
  }
  if (!session?.user) {
    throw new Error('User not found');
  }
  if (oldMemo.externalUserId !== session?.user.externalUserId) {
    throw new Error('You are not authorized to update this memo');
  }

  await prisma.memo.update({
    where: {
      id: Number(formData.get('id')) as unknown as number,
    },
    data: {
      title: formData.get('title') as string,
      updatedAt: new Date(),
    },
  });

  revalidatePath('/memo');
}

export async function deleteMemo(id: number) {
  const session = await auth();
  const oldMemo = await findById(id);

  if (!oldMemo) {
    throw new Error('Memo not found');
  }
  if (!session?.user?.externalUserId) {
    throw new Error('User not found');
  }
  if (oldMemo.externalUserId !== session?.user.externalUserId) {
    throw new Error('You are not authorized to delete this memo');
  }

  await prisma.memo.delete({
    where: {
      id: id,
    },
  });
  revalidatePath('/memo');
}
