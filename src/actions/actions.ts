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

type ActionResponse = {
  success: boolean;
  message: string;
  data?: any;
};

// Common function for authorization and error handling
async function authorizeUser() {
  const session = await auth();
  const externalUserId = session?.user?.externalUserId;

  if (!externalUserId) {
    throw new Error('User not authenticated');
  }

  return { externalUserId, session };
}

async function validateMemoOwnership(memoId: number) {
  const { externalUserId, session } = await authorizeUser();

  const memo = await prisma.memo.findUnique({
    where: { id: memoId },
  });

  if (!memo) {
    throw new Error('Memo not found');
  }

  if (memo.externalUserId !== externalUserId) {
    throw new Error('You are not authorized to modify this memo');
  }

  return { memo, externalUserId, session };
}

export async function findById(id: number) {
  return await prisma.memo.findUnique({
    where: { id },
  });
}

export async function create(
  prevState: { message: string },
  formData: FormData
): Promise<ActionResponse> {
  try {
    const { externalUserId } = await authorizeUser();
    const title = formData.get('title') as string;

    // First increment the order of all existing memos
    await prisma.memo.updateMany({
      where: { externalUserId },
      data: {
        order: {
          increment: 1,
        },
      },
    });

    // Create new memo with order 0 to display at the top
    const newMemo = await prisma.memo.create({
      data: {
        title,
        externalUserId,
        order: 0,
      },
    });

    revalidatePath('/');

    return {
      success: true,
      message: 'Memo created successfully',
      data: newMemo,
    };
  } catch (error) {
    console.error('Error creating memo:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error creating memo',
    };
  }
}

export async function update(formData: FormData): Promise<ActionResponse> {
  try {
    const memoId = Number(formData.get('id'));
    await validateMemoOwnership(memoId);

    const title = formData.get('title') as string;

    const updatedMemo = await prisma.memo.update({
      where: { id: memoId },
      data: {
        title: title ?? '',
        updatedAt: new Date(),
      },
    });

    revalidatePath('/');

    return {
      success: true,
      message: 'Memo updated successfully',
      data: updatedMemo,
    };
  } catch (error) {
    console.error('Error updating memo:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error updating memo',
    };
  }
}

export async function deleteMemo(id: number): Promise<ActionResponse> {
  try {
    await validateMemoOwnership(id);

    await prisma.memo.delete({
      where: { id },
    });

    revalidatePath('/');

    return {
      success: true,
      message: 'Memo deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting memo:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error deleting memo',
    };
  }
}

export async function updateMemoOrder(
  items: { id: number; order: number }[]
): Promise<ActionResponse> {
  try {
    const { externalUserId } = await authorizeUser();

    // Verify all memos belong to the current user
    const memoIds = items.map((item) => item.id);
    const memosCount = await prisma.memo.count({
      where: {
        id: { in: memoIds },
        externalUserId,
      },
    });

    if (memosCount !== memoIds.length) {
      throw new Error('One or more memos do not belong to the current user');
    }

    // Use transaction for bulk update
    await prisma.$transaction(
      items.map((item) =>
        prisma.memo.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );

    revalidatePath('/');

    return {
      success: true,
      message: 'Memo order updated successfully',
    };
  } catch (error) {
    console.error('Error updating memo order:', error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Error updating memo order',
    };
  }
}
