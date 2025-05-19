'use client';
import { signOut } from 'next-auth/react';

export function SignOut() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: '/' })}
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
  );
}
