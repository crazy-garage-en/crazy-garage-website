import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languageOptions = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '/crazy-garage-website/images/flags/en.webp'
  },
  {
    code: 'mk',
    name: 'Македонски',
    nativeName: 'Македонски',
    flag: '/crazy-garage-website/images/flags/mk.png'
  },
  {
    code: 'sq',
    name: 'Shqip',
    nativeName: 'Shqip',
    flag: '/crazy-garage-website/images/flags/al.jpg'
  }
];

export function useLanguage() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = pathname?.split('/')[2] || 'en';
  const currentLanguage = languageOptions.find((lang) => lang.code === currentLang) || languageOptions[0];
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const getLanguagePath = (langCode: string) => {
    if (!pathname) return `/crazy-garage-website/${langCode}`;
    const pathParts = pathname.split('/');
    pathParts[2] = langCode;
    return pathParts.join('/');
  };

  const switchLanguage = async (langCode: string) => {
    try {
      setIsLoading(true);
      await i18n.changeLanguage(langCode);
      const newPath = getLanguagePath(langCode);
      router.push(newPath);
    } catch (error) {
      console.error('Error switching language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    currentLang,
    isLoading,
    switchLanguage,
    languageOptions,
    currentLanguage
  };
} 