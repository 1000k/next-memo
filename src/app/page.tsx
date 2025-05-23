import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import UserAvatar from '@/components/UserAvatar';
import MemoList from '@/components/MemoList';
import MemoAdd from '@/components/MemoAdd';

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const memos = await prisma.memo.findMany({
    where: {
      externalUserId: session?.user?.externalUserId,
    },
    orderBy: {
      order: 'asc',
    },
  });

  return (
    <div className="md:container md:max-w-screen-md p-4 mx-auto">
      <header className="flex items-center justify-between mb-4 gap-4">
        <MemoAdd />
        <UserAvatar image={session?.user?.image ?? undefined} />
      </header>
      <MemoList memos={memos} />
    </div>
  );
}
