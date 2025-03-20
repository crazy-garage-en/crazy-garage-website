'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import GalleryItem from './GalleryItem';
import { useTranslation } from 'react-i18next';
import '../../i18n/client';

// Gallery items data
const galleryItems = [
  {
    id: 1,
    title: 'Interior Door Panel',
    description: 'Professional interior restoration and deep cleaning',
    category: 'interior',
    beforeImage: '/images/gallery/left-side-door-before.JPG',
    afterImage: '/images/gallery/left-side-door-after.JPG',
  },
  {
    id: 2,
    title: 'Interior Side Panel',
    description: 'Complete interior detailing and surface restoration',
    category: 'interior',
    beforeImage: '/images/gallery/inside-from-right-before-2.JPG',
    afterImage: '/images/gallery/from-right-side-after.JPG',
  },
  {
    id: 3,
    title: 'Surface Treatment',
    description: 'Professional surface cleaning and protection',
    category: 'interior',
    beforeImage: '/images/gallery/before.jpeg',
    afterImage: '/images/gallery/after.jpeg',
  },
  // Add more gallery items here
];

// Categories for filtering
const categories = [
  { id: 'all', label: 'All' },
  { id: 'interior', label: 'Interior' },
  { id: 'exterior', label: 'Exterior' },
  { id: 'headlights', label: 'Headlights' },
];

interface GalleryGridProps {
  lng: string;
}

export default function GalleryGrid({ lng }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { t } = useTranslation('common', { lng });

  const filteredItems =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div>
      {/* Filter Section */}
      <div className="mb-12">
        {/* Mobile Filter */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full px-6 py-4 bg-secondary/30 backdrop-blur-xl rounded-xl border border-white/5 flex items-center justify-between"
          >
            <span className="text-white font-medium">
              Filter:{' '}
              {categories.find((cat) => cat.id === activeCategory)?.label}
            </span>
            <FontAwesomeIcon
              icon={faFilter}
              className={`text-accent transition-transform duration-300 ${
                isFilterOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 p-2 bg-secondary/30 backdrop-blur-xl rounded-xl border border-white/5"
              >
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full px-4 py-3 rounded-lg text-left transition-colors ${
                      activeCategory === category.id
                        ? 'bg-accent/20 text-white'
                        : 'text-gray-300/90 hover:bg-accent/10'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Filter */}
        <div className="hidden lg:flex items-center justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-accent/20 text-white scale-105'
                  : 'text-gray-300/90 hover:bg-accent/10 hover:text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {filteredItems.map((item, index) => (
          <GalleryItem
            key={item.id}
            title={item.title}
            description={item.description}
            beforeImage={item.beforeImage}
            afterImage={item.afterImage}
            delay={index}
            lng={lng}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p className="text-gray-300/90 text-lg">
            No items found in this category.
          </p>
        </motion.div>
      )}
    </div>
  );
}
