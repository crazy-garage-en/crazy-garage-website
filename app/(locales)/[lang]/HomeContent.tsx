'use client';

import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Contact from '@/components/sections/Contact';

interface HomeContentProps {
  lang: string;
}

export default function HomeContent({ lang }: HomeContentProps) {
  return (
    <main>
      <Hero />
      <Services />
      <Contact />
    </main>
  );
}
