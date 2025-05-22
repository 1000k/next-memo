import SignIn from '@/components/sign-in';

export default async function Login() {
  return (
    <main className="flex h-svh flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-4">next-memo</h1>
      <SignIn />
    </main>
  );
} 