'use client';

import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';

interface HomeContentProps {
  lang: string;
}

export default function HomeContent({ lang }: HomeContentProps) {
  return (
    <main>
      <Hero />
      <Services />
    </main>
  );
}
