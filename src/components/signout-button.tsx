import { handleSignOut } from '@/actions/actions';
import { SignOutIcon } from '@/components/icons';

export function SignOut() {
  return (
    <button
      className="text-sm text-blue-500 bg-transparent p-0 border-none hover:text-blue-300 focus:outline-none"
      onClick={() => handleSignOut()}
    >
      <SignOutIcon />
      Sign Out
    </button>
  );
}
