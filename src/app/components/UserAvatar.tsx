import { auth } from '@/../auth';
import Image from 'next/image';

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div>
      <Image
        className="rounded-full"
        width={40}
        height={40}
        src={session.user.image ?? '/default-avatar.png'}
        alt="User Avatar"
      />
    </div>
  );
}
