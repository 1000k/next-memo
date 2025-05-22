'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

// Extend the User type to include externalUserId
declare module 'next-auth' {
  interface User {
    externalUserId?: string;
  }
}

export async function findById(id: number) {
  const result = await prisma.memo.findUnique({
    where: {
      id: id,
    },
  });
  return result;
}

export async function create(
  prevState: { message: string },
  formData: FormData
) {
  const session = await auth();
  const externalUserId = session?.user?.externalUserId;

  if (!externalUserId) {
    throw new Error('User not found');
  }

  try {
    // 先に既存のメモのorderを1つずつ増やす
    await prisma.memo.updateMany({
      where: {
        externalUserId: externalUserId,
      },
      data: {
        order: {
          increment: 1,
        },
      },
    });

    // 新しいメモを作成（orderは0で一番上に表示）
    await prisma.memo.create({
      data: {
        title: formData.get('title') as string,
        externalUserId: externalUserId,
        order: 0, // 一番上に表示されるよう0を設定
      },
    });

    revalidatePath('/');
    return {
      message: 'Memo created successfully',
    };
  } catch (error) {
    console.error('Error creating memo:', error);
    return {
      message: 'Error creating memo',
    };
  }
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
      id: Number(formData.get('id')),
    },
    data: {
      title: (formData.get('title') as string) ?? '',
      updatedAt: new Date(),
    },
  });

  revalidatePath('/');
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
  revalidatePath('/');
}

// New action to update memo order
export async function updateMemoOrder(items: { id: number; order: number }[]) {
  const session = await auth();

  if (!session?.user?.externalUserId) {
    throw new Error('User not found');
  }

  // トランザクションを使用して一括更新
  await prisma.$transaction(
    items.map((item) =>
      prisma.memo.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    )
  );

  revalidatePath('/');
}
