import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, LanguageOption } from '@/hooks/useLanguage';
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
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Current Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="inline-flex items-center justify-between w-full px-3 py-1.5 text-sm font-medium 
                 text-white/90 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg 
                 hover:bg-white/20 hover:border-white/20 transition-all duration-200
                 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-1 focus:ring-offset-white/5"
        aria-label="Select language"
      >
        <div className="flex items-center">
          <div className="relative w-5 h-5 mr-2 rounded overflow-hidden">
            <Image
              src={currentLanguage?.flag || '/images/flags/en.webp'}
              alt={currentLanguage?.name || 'English'}
              fill
              className="object-cover"
              sizes="20px"
            />
          </div>
          <span className="text-sm">{currentLanguage?.nativeName}</span>
        </div>
        {isLoading ? (
          <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 ml-2 animate-spin text-white/70" />
        ) : (
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`w-3.5 h-3.5 ml-2 transition-transform duration-200 text-white/70 ${isOpen ? 'rotate-180' : ''}`}
          />
        )}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 w-48 mt-2 origin-top-right bg-white/10 backdrop-blur-lg 
                     border border-white/10 rounded-lg shadow-lg ring-1 ring-black/5 
                     focus:outline-none z-50 overflow-hidden"
          >
            <div className="py-1" role="menu" aria-orientation="vertical">
              {languageOptions.map((option: LanguageOption) => (
                <button
                  key={option.code}
                  onClick={() => handleLanguageSelect(option.code)}
                  className={`flex items-center w-full px-3 py-2 text-sm ${
                    currentLang === option.code
                      ? 'bg-white/20 text-white'
                      : 'text-white/90 hover:bg-white/10'
                  } transition-colors duration-150`}
                  role="menuitem"
                >
                  <div className="relative w-5 h-5 mr-2 rounded overflow-hidden">
                    <Image
                      src={option.flag}
                      alt={option.name}
                      fill
                      className="object-cover"
                      sizes="20px"
                    />
                  </div>
                  <span>{option.nativeName}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 