'use client';

import Hero from '@/app/components/sections/Hero';
import Services from '@/app/components/sections/Services';
import Gallery from '@/app/components/sections/Gallery';
import Contact from '@/app/components/sections/Contact';

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
