import type { Metadata } from 'next';
import { Montserrat, Roboto } from 'next/font/google';
import '../styles/globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { dir } from 'i18next';
import { languages } from '../i18n/settings';

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

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}

export default function Layout({
    children,
    params: { lng }
}: {
    children: React.ReactNode;
    params: { lng: string };
}) {
    return (
        <html lang={lng} dir={dir(lng)} className={`${montserrat.variable} ${roboto.variable}`}>
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
                />
            </head>
            <body className="min-h-screen bg-primary text-accent antialiased">
                <Navbar />
                <main className="relative">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
