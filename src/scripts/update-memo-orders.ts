import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function updateMemoOrders() {
  try {
    // Get all unique externalUserIds
    const users = await prisma.memo.findMany({
      select: {
        externalUserId: true,
      },
      distinct: ['externalUserId'],
    });
    
    // For each user, update their memos
    for (const user of users) {
      const memos = await prisma.memo.findMany({
        where: {
          externalUserId: user.externalUserId,
        },
        orderBy: {
          updatedAt: 'desc', // 更新日時の降順で取得（新しい順）
        },
      });
      
      // Update each memo with an order (newest = lowest order number)
      for (let i = 0; i < memos.length; i++) {
        await prisma.memo.update({
          where: {
            id: memos[i].id,
          },
          data: {
            order: i, // 最も新しいメモはorder=0になる
          },
        });
      }
      
      console.log(`Updated ${memos.length} memos for user ${user.externalUserId}`);
    }
    
    console.log('All memo orders updated successfully!');
  } catch (error) {
    console.error('Error updating memo orders:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateMemoOrders(); 