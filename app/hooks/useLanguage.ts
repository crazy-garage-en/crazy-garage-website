import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const languageOptions: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '/images/flags/en.webp'
  },
  {
    code: 'mk',
    name: 'Macedonian',
    nativeName: 'Македонски',
    flag: '/images/flags/mk.png'
  },
  {
    code: 'sq',
    name: 'Albanian',
    nativeName: 'Shqip',
    flag: '/images/flags/al.jpg'
  }
];

export function useLanguage() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Extract language from pathname (format: /[lang]/rest/of/path)
    const pathLang = pathname.split('/')[1];
    if (languageOptions.some(lang => lang.code === pathLang)) {
      setCurrentLang(pathLang);
    }
  }, [pathname]);

  const switchLanguage = async (langCode: string) => {
    if (currentLang === langCode) return;
    
    setIsLoading(true);
    try {
      // Get the path after the language code
      const newPath = pathname.split('/').slice(2).join('/');
      // Construct new URL with selected language
      const newUrl = `/${langCode}/${newPath}`;
      router.push(newUrl);
      setCurrentLang(langCode);
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
    languageOptions
  };
} 