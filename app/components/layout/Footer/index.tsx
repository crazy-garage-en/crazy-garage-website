'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faInstagram,
    faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';
import '../../../i18n/client';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    const lng = pathname?.split('/')[1] || 'en';
    const { t } = useTranslation('common', { lng });

    return (
        <footer className="bg-primary border-t border-accent/5">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-300/90 text-sm">
                        © {new Date().getFullYear()} Crazy Garage. {t('footer.rights')}
                    </p>

                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm text-gray-300/90">
                            {t('footer.followUs')}
                        </span>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://www.facebook.com/profile.php?id=100063555551694"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent hover:text-white transition-colors"
                                aria-label="Facebook"
                            >
                                <FontAwesomeIcon icon={faFacebook} className="text-xl" />
                            </a>
                            <a
                                href="https://www.instagram.com/crazy_garage_/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent hover:text-white transition-colors"
                                aria-label="Instagram"
                            >
                                <FontAwesomeIcon icon={faInstagram} className="text-xl" />
                            </a>
                            <a
                                href="https://wa.me/38976276666"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent hover:text-white transition-colors"
                                aria-label="WhatsApp"
                            >
                                <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
