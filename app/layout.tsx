import type { Metadata } from 'next';
import { Montserrat, Roboto } from 'next/font/google';
import './styles/globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const roboto = Roboto({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Crazy Garage - Professional Car Detailing',
  description:
    "Transform your car's look with Crazy Garage's professional car detailing, polishing, and headlight restoration services.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable}`}>
      <body className="bg-primary text-accent">{children}</body>
    </html>
  );
}
