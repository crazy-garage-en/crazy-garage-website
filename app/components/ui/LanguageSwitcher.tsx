import { useState, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import type { LanguageOption } from '@/hooks/useLanguage';
import { useClickOutside } from '@/hooks/useClickOutside';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSpinner } from '@fortawesome/free-solid-svg-icons';

const dropdownVariants = {
  hidden: { opacity: 0, y: -5, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0, 
    y: -5, 
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

// Memoize language option component for better performance
const LanguageOption = memo(({ 
  lang, 
  isActive, 
  onClick 
}: { 
  lang: LanguageOption; 
  isActive: boolean; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-accent/5 rounded-lg transition-colors ${
      isActive ? 'text-accent' : 'text-gray-300/90'
    }`}
  >
    <Image
      src={lang.flag}
      alt={lang.name}
      width={20}
      height={20}
      className="rounded-sm"
    />
    <span className="font-medium">{lang.name}</span>
  </button>
));

LanguageOption.displayName = 'LanguageOption';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLang, isLoading, switchLanguage, languageOptions } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useClickOutside(dropdownRef, () => setIsOpen(false));
  
  const currentLanguage = languageOptions.find((lang: LanguageOption) => lang.code === currentLang);

  const handleLanguageSelect = async (langCode: string) => {
    setIsOpen(false);
    await switchLanguage(langCode);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent/5 transition-colors"
      >
        {currentLanguage && (
          <>
            <Image
              src={currentLanguage.flag}
              alt={currentLanguage.name}
              width={20}
              height={20}
              className="rounded-sm"
            />
            <span className="font-medium text-gray-300/90">
              {currentLanguage.name}
            </span>
          </>
        )}
        {isLoading ? (
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-accent animate-spin"
          />
        ) : (
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`text-gray-300/90 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        )}
      </button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full right-0 mt-2 w-48 bg-secondary/30 backdrop-blur-xl rounded-xl border border-white/5 shadow-lg overflow-hidden"
          >
            <div className="py-2">
              {languageOptions.map((lang: LanguageOption) => (
                <LanguageOption
                  key={lang.code}
                  lang={lang}
                  isActive={currentLang === lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 