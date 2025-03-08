'use client';

import Hero from '@/components/sections/Hero';

interface HomeContentProps {
  lang: string;
}

export default function HomeContent({ lang }: HomeContentProps) {
  return (
    <main>
      <Hero />
    </main>
  );
}
