'use client';

import { useEffect } from 'react';
import { detectLanguage, redirectToLanguage } from './utils/languageDetection';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const lang = detectLanguage();
    redirectToLanguage(lang);
  }, []);

  return children;
} 