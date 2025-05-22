import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import UserAvatar from '@/app/components/UserAvatar';
import { SignOut } from '@/app/components/signout-button';
import MemoList from '@/app/components/MemoList';
import MemoAdd from '@/app/components/MemoAdd';

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
      <header className="flex items-center justify-between mb-4">
        <MemoAdd />
        <div className="flex w-1/3 items-center justify-end gap-2">
          <UserAvatar />
          <SignOut />
        </div>
      </header>
      <MemoList memos={memos} />
    </div>
  );
}
