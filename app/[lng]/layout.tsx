import { dir } from 'i18next';
import { languages } from '../i18n/settings';
import { detectLanguage } from '../utils/languageDetection';
import { Metadata } from 'next';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import '../styles/globals.css';

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
    title: 'Crazy Garage - Professional Car Detailing',
    description: 'Professional car detailing services in Skopje, Macedonia',
    icons: {
        icon: '/crazy-garage-website/images/logo/logo.png',
    },
};

export default function RootLayout({
    children,
    params: { lng },
}: {
    children: React.ReactNode;
    params: { lng: string };
}) {
    if (typeof window !== 'undefined') {
        const detectedLng = detectLanguage();
        if (detectedLng !== lng) {
            window.location.href = `/crazy-garage-website/${detectedLng}`;
            return null;
        }
    }

    return (
        <html lang={lng} dir={dir(lng)}>
            <head>
                <link rel="icon" href="/crazy-garage-website/images/logo/logo.png" />
            </head>
            <body>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
