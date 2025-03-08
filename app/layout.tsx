import type { Metadata } from 'next';
import { Montserrat, Roboto } from 'next/font/google';
import './styles/globals.css';
import Navbar from './components/layout/Navbar';
import Script from 'next/script';

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
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className="bg-primary text-accent">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
