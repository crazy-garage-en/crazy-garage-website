'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();
  const lng = pathname?.split('/')[2] || 'en';

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">404</h2>
        <p className="text-xl mb-8">Page not found</p>
        <Link
          href={`/crazy-garage-website/${lng}`}
          className="px-6 py-3 bg-accent text-primary rounded-lg hover:bg-accent/90 transition-colors inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
