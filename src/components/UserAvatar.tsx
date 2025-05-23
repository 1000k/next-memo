'use client';

import Image from 'next/image';
import { useState } from 'react';
import { handleSignOut } from '@/actions/actions';
import { SignOutIcon } from '@/components/icons';

export default function UserAvatar({ image }: { image?: string }) {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((open) => !open);
  };

  return (
    <div className="relative flex items-center justify-center">
      <Image
        className="rounded-full bg-white"
        width={40}
        height={40}
        src={image || '/images/default-avatar.png'}
        alt="User Avatar"
        onClick={() => toggleOpen()}
      />
      {open && (
        <div className="absolute top-10 right-0 mt-2 w-40 z-10">
          <button
            className="inline-flex p-4 text-gray-100  bg-gray-700 shadow-lg border-none hover:text-white hover:bg-gray-600 w-full rounded-md text-left"
            type="button"
            onClick={() => handleSignOut()}
          >
            <SignOutIcon />
            <span className="ml-2">Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}
