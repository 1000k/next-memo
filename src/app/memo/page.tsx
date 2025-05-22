import UserAvatar from '@/components/UserAvatar';
import { SignOut } from '@/components/signout-button';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import MemoList from '@/components/MemoList';
import MemoAdd from '@/components/MemoAdd';

export default async function Memo() {
  const session = await auth();
  console.log('Memo > session: ', session);

  const memos = await prisma.memo.findMany({
    where: {
      externalUserId: session?.user?.externalUserId,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
  console.log(memos);

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
