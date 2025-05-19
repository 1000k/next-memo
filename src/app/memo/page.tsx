import UserAvatar from '@/app/components/UserAvatar';
import { SignOut } from '@/app/components/signout-button';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { create } from '@/actions/actions';
import MemoList from '@/app/components/MemoList';

export default async function Memo() {
  const session = await auth();
  console.log('Memo > session: ', session);

  const memos = await prisma.memo.findMany({
    where: {
      externalUserId: session?.user.externalUserId,
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
            className="border-2 border-gray-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            required
          />
          <button
            type="submit"
            className="text-gray-400 transition duration-150 ease-in-out rounded-md p-2 ml-4 hover:bg-gray-700 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
              <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
              <title>Add</title>
            </svg>
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
