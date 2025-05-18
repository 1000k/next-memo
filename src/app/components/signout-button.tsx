import { signOut } from '@/../auth';

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button
        type="submit"
        className="rounded-md bg-red-900 px-4 py-2 text-sm font-medium text-gray shadow-sm hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Sign Out
      </button>
    </form>
  );
}
