export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'mk' }, { lang: 'sq' }];
}

export default function Home({ params }: { params: { lang: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to Crazy Garage - {params.lang.toUpperCase()}</h1>
    </main>
  );
}
