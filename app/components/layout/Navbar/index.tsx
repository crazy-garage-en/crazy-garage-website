'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '../../../i18n/client';
import LanguageSwitcher from './LanguageSwitcher';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const lng = pathname.split('/')[1] || 'en';
    const { t } = useTranslation('common', { lng });

    const navigationItems = ['services', 'gallery', 'contact'];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-lg border-b border-accent/5">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
                        <Link href={`/${lng}`} className="block">
                            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-accent/10">
                                <Image
                                    src="/images/logo/logo.jpg"
                                    alt="Crazy Garage Logo"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 56px, 64px"
                                    priority
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navigationItems.map((item) => (
                            <Link
                                key={item}
                                href={`#${item}`}
                                className="group relative px-2 py-1 text-[#e8e8e8] hover:text-white transition-colors uppercase text-sm tracking-wider font-medium"
                            >
                                <span>{t(`navigation.${item}`)}</span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                        <div className="pl-4 border-l border-accent/10">
                            <LanguageSwitcher />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
                        aria-label="Toggle mobile menu"
                    >
                        <div className="w-6 h-4 relative flex flex-col justify-between">
                            <span
                                className={`w-full h-0.5 bg-accent transform transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
                            />
                            <span
                                className={`w-full h-0.5 bg-accent transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}
                            />
                            <span
                                className={`w-full h-0.5 bg-accent transform transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
                            />
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
                        ? 'max-h-64 opacity-100'
                        : 'max-h-0 opacity-0 pointer-events-none'}`}
                >
                    <div className="py-4 space-y-4">
                        {navigationItems.map((item) => (
                            <Link
                                key={item}
                                href={`#${item}`}
                                className="block px-4 py-2 text-[#e8e8e8] hover:text-white hover:bg-white/5 transition-colors rounded-lg uppercase text-sm tracking-wider font-medium"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t(`navigation.${item}`)}
                            </Link>
                        ))}
                        <div className="px-4 pt-4 border-t border-accent/10">
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
