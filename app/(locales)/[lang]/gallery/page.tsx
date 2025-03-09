'use client';

import { motion } from 'framer-motion';
import GalleryGrid from '@/components/sections/GalleryGrid';

interface GalleryPageProps {
  params: {
    lang: string;
  };
}

export default function GalleryPage({ params }: GalleryPageProps) {
  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* Background gradient effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-50 -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-30 -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-24"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Our Gallery
          </h1>
          <p className="text-xl text-gray-300/90 max-w-2xl mx-auto">
            Explore our complete collection of transformations and see the
            quality of our work
          </p>
          <div className="w-24 h-1.5 bg-accent/50 mx-auto mt-8 rounded-full" />
        </motion.div>

        <GalleryGrid />
      </div>
    </div>
  );
}
