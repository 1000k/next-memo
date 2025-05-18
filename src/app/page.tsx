import Link from 'next/link';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-4">Next-memo</h1>
      <Link
        href="/memo"
        className="text-blue-500 underline"
      >
        write
      </Link>
    </main>
  );
}
