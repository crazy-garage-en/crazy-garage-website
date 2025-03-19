import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/app/hooks/useLanguage';
import { useClickOutside } from '@/app/hooks/useClickOutside';
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
  
  const currentLanguage = languageOptions.find(lang => lang.code === currentLang);

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
        className="inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium 
                 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-label="Select language"
      >
        <div className="flex items-center">
          <div className="relative w-5 h-5 mr-2">
            <Image
              src={currentLanguage?.flag || '/images/flags/en.png'}
              alt={currentLanguage?.name || 'English'}
              fill
              className="object-cover rounded-sm"
            />
          </div>
          <span>{currentLanguage?.nativeName}</span>
        </div>
        {isLoading ? (
          <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 ml-2 animate-spin" />
        ) : (
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
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
            className="absolute right-0 w-56 mt-2 origin-top-right bg-white border 
                     border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 
                     focus:outline-none z-50"
          >
            <div className="py-1" role="menu" aria-orientation="vertical">
              {languageOptions.map((option) => (
                <button
                  key={option.code}
                  onClick={() => handleLanguageSelect(option.code)}
                  className={`flex items-center w-full px-4 py-2 text-sm ${
                    currentLang === option.code
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  role="menuitem"
                >
                  <div className="relative w-5 h-5 mr-2">
                    <Image
                      src={option.flag}
                      alt={option.name}
                      fill
                      className="object-cover rounded-sm"
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