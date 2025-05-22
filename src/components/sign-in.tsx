import { signIn } from '@/auth';
import { GoogleIcon } from './icons';

export default function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google', { redirectTo: '/' });
      }}
    >
      <button
        type="submit"
        className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
      >
        <GoogleIcon />
        Sign in with Google
      </button>
    </form>
  );
}
