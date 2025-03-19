import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { languages, fallbackLng } from '../i18n/settings';

interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

// Language options with their native names and flag paths
export const languageOptions: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '/images/flags/en.webp' },
  { code: 'mk', name: 'Macedonian', nativeName: 'Македонски', flag: '/images/flags/mk.png' },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip', flag: '/images/flags/al.jpg' },
];

export const useLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState<string>(fallbackLng);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Extract current language from pathname on mount and when pathname changes
  useEffect(() => {
    const pathnameSegments = pathname?.split('/') || [];
    const currentPathLang = pathnameSegments[1];
    if (languages.includes(currentPathLang)) {
      setCurrentLang(currentPathLang);
      localStorage.setItem('preferredLanguage', currentPathLang);
    }
  }, [pathname]);

  // Load preferred language from localStorage on mount
  useEffect(() => {
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang && languages.includes(storedLang)) {
      setCurrentLang(storedLang);
    }
  }, []);

  const switchLanguage = async (newLang: string) => {
    if (newLang === currentLang || !languages.includes(newLang)) return;

    setIsLoading(true);
    try {
      // Get the current path segments
      const segments = pathname?.split('/') || [];
      // Remove the language segment if it exists
      if (languages.includes(segments[1])) {
        segments.splice(1, 1);
      }
      // Construct new path with new language
      const newPath = `/${newLang}${segments.length > 1 ? segments.join('/') : ''}`;
      
      localStorage.setItem('preferredLanguage', newLang);
      router.push(newPath);
      setCurrentLang(newLang);
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
  };
}; 