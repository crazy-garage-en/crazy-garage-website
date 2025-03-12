'use client';

import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Gallery from '@/components/sections/Gallery';
import Contact from '@/components/sections/Contact';

export default function Home({ params: { lng } }: { params: { lng: string } }) {
    return (
        <main>
            <Hero lng={lng} />
            <Services lng={lng} />
            <Gallery lng={lng} />
            <Contact />
        </main>
    );
}
