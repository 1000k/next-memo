import { signOut } from '@/auth';

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({
          redirectTo: '/',
        });
      }}
    >
      <button
        type="submit"
        className="text-sm text-blue-500 bg-transparent p-0 border-none hover:text-blue-300 focus:outline-none"
      >
        Sign Out
      </button>
    </form>
  );
}
