import Link from 'next/link';
import SignIn from '@/app/components/sign-in';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-4">next-memo</h1>
      <SignIn />
      <Link
        href="/memo"
        className="text-blue-500 underline"
      ></Link>
    </main>
  );
}
