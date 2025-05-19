import UserAvatar from '@/app/components/UserAvatar';
import { SignOut } from '@/app/components/signout-button';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { create } from '@/actions/actions';
import MemoList from '@/app/components/MemoList';

export default async function Memo() {
  const session = await auth();
  console.log(session);

  const memos = await prisma.memo.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
  console.log(memos);

  return (
    <div className="md:container md:max-w-screen-md p-4 mx-auto">
      <header className="flex items-center justify-between mb-4">
        <form
          action={create}
          className="flex w-2/3 items-center"
        >
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Input your memo here..."
            className="border-2 border-gray-300 rounded-md p-2 w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md p-2 ml-4 hover:bg-blue-600"
          >
            add
          </button>
        </form>
        <div className="flex w-1/3 items-center justify-end gap-2">
          <UserAvatar />
          <SignOut />
        </div>
      </header>
      <MemoList memos={memos} />
    </div>
  );
}
