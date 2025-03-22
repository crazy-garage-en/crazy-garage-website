import { languages, fallbackLng } from '../i18n/settings';

export function detectLanguage(): string {
  if (typeof window === 'undefined') {
    return fallbackLng;
  }

  const pathname = window.location.pathname;
  const language = languages.find(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );

  if (language) {
    return language;
  }

  // Check browser language
  const browserLang = navigator.language.split('-')[0];
  if (languages.includes(browserLang)) {
    return browserLang;
  }

  return fallbackLng;
}

export function redirectToLanguage(lang: string) {
  if (typeof window === 'undefined') {
    return;
  }

  const currentPath = window.location.pathname;
  const isRoot = currentPath === '/';
  const hasLang = languages.some(
    (l) => currentPath.startsWith(`/${l}/`) || currentPath === `/${l}`
  );

  if (isRoot || !hasLang) {
    window.location.href = `/${lang}`;
  }
} 