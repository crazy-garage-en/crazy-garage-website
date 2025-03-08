'use client';

import TestButton from '@/components/ui/TestButton';

interface HomeContentProps {
  lang: string;
}

export default function HomeContent({ lang }: HomeContentProps) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-4">
      <h1 className="text-4xl font-bold text-center">
        Welcome to Crazy Garage - {lang.toUpperCase()}
      </h1>
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg text-center max-w-2xl">
          Professional car detailing services. We bring your car back to life!
        </p>
        <TestButton
          label="Click me!"
          onClick={() => alert('Everything is working!')}
        />
      </div>
    </main>
  );
}
