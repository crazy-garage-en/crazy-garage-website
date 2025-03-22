'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import '@/app/i18n/client';
import { getPath } from '@/app/utils/basePath';

const languages = [
    {
        code: 'en',
        name: 'English',
        flag: '/images/flags/en.webp',
    },
    {
        code: 'mk',
        name: 'Македонски',
        flag: '/images/flags/mk.png',
    },
    {
        code: 'sq',
        name: 'Shqip',
        flag: '/images/flags/al.jpg',
    },
] as const;

export default function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const currentLang = pathname?.split('/')[1] || 'en';
    const { i18n } = useTranslation('common', { lng: currentLang });
    const currentLanguage = languages.find((lang) => lang.code === currentLang) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = async (langCode: string) => {
        await i18n.changeLanguage(langCode);
        setIsOpen(false);
    };

    const getLanguagePath = (langCode: string) => {
        // Get the path after the language code
        const pathParts = pathname?.split('/').slice(2) || [];
        return getPath(`/${langCode}${pathParts.length ? '/' + pathParts.join('/') : ''}`);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/5 focus:outline-none"
                aria-label={`Select language: ${currentLanguage.name}`}
            >
                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-accent/10">
                    <Image
                        src={currentLanguage.flag}
                        alt={currentLanguage.name}
                        fill
                        className="object-cover"
                        sizes="24px"
                    />
                </div>
                <span className="hidden sm:block text-sm font-medium text-[#e8e8e8]">
                    {currentLanguage.name}
                </span>
                <svg
                    className={`w-4 h-4 text-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            <div
                className={`absolute right-0 mt-2 w-48 rounded-lg bg-[#1a1a1a]/95 backdrop-blur-md shadow-xl border border-accent/10 transition-all duration-300 ${isOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-2 pointer-events-none'}`}
            >
                <div className="py-2">
                    {languages.map((lang) => (
                        <Link
                            key={lang.code}
                            href={getLanguagePath(lang.code)}
                            className={`flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors ${currentLang === lang.code ? 'bg-white/5' : ''}`}
                            onClick={() => handleLanguageChange(lang.code)}
                        >
                            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-accent/10">
                                <Image
                                    src={lang.flag}
                                    alt={lang.name}
                                    fill
                                    className="object-cover"
                                    sizes="24px"
                                />
                            </div>
                            <span className="text-sm font-medium text-[#e8e8e8]">
                                {lang.name}
                            </span>
                            {currentLang === lang.code && (
                                <svg
                                    className="w-4 h-4 text-accent ml-auto"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
