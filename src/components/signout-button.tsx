import { signOut } from '@/auth';
import { SignOutIcon } from '@/components/icons';
export function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({
          redirectTo: '/login',
        });
      }}
    >
      <button
        type="submit"
        className="text-sm text-blue-500 bg-transparent p-0 border-none hover:text-blue-300 focus:outline-none"
      >
        <SignOutIcon />
        Sign Out
      </button>
    </form>
  );
}
