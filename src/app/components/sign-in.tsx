import { signIn } from '@/../auth';

export default function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google', {
          redirectTo: '/memo',
        });
      }}
    >
      <button
        type="submit"
        className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Signin with Google
      </button>
    </form>
  );
}
