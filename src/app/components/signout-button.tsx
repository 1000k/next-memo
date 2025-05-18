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
        className="text-sm text-blue-500 bg-transparent p-0 border-none hover:text-blue-300 focus:outline-none"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
        }}
      >
        Sign Out
      </button>
    </form>
  );
}
