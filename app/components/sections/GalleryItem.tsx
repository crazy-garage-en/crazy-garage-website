'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';

interface GalleryItemProps {
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  delay: number;
}

export default function GalleryItem({
  title,
  description,
  beforeImage,
  afterImage,
  delay,
}: GalleryItemProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Hide the hint after 3 seconds
  useEffect(() => {
    if (showHint) {
      const timer = setTimeout(() => setShowHint(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showHint]);

  // Prevent scrolling when dragging
  useEffect(() => {
    if (!isDragging) return;

    const preventScroll = (e: TouchEvent) => e.preventDefault();
    document.addEventListener('touchmove', preventScroll, { passive: false });
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('touchmove', preventScroll);
      document.body.style.overflow = '';
    };
  }, [isDragging]);

  const handleSliderChange = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;

    requestAnimationFrame(() => {
      setSliderPosition(Math.max(0, Math.min(percentage, 100)));
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    handleSliderChange(e.clientX);
    setShowHint(false);
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };
  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleSliderChange(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    setIsDragging(true);
    handleSliderChange(touch.clientX);
    setShowHint(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    handleSliderChange(touch.clientX);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.2 }}
      className="group relative bg-secondary/30 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/5 shadow-lg"
    >
      {/* Before/After Slider Container */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] select-none touch-none cursor-ew-resize bg-secondary/50"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* Loading State */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary">
            <div className="w-10 h-10 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
          </div>
        )}

        {/* After Image (Base) */}
        <div className="absolute inset-0">
          <Image
            src={afterImage}
            alt={`${title} - After`}
            fill
            className={`object-cover transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            quality={100}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoadingComplete={() => setIsLoaded(true)}
          />
        </div>

        {/* Before Image (Overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="absolute inset-0">
            <Image
              src={beforeImage}
              alt={`${title} - Before`}
              fill
              className={`object-cover transition-opacity duration-500 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              quality={100}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white/80 backdrop-blur-sm"
          style={{
            left: `${sliderPosition}%`,
            transform: 'translateX(-50%)',
          }}
        >
          {/* Slider Handle */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-colors duration-200 ${
              isDragging
                ? 'bg-accent shadow-accent/20'
                : 'bg-white hover:bg-accent/5'
            }`}
          >
            <FontAwesomeIcon
              icon={faArrowsLeftRight}
              className={`text-base transition-colors ${
                isDragging ? 'text-white' : 'text-primary'
              }`}
            />
          </div>
        </div>

        {/* Labels */}
        <AnimatePresence>
          {(isHovered || isDragging) && (
            <>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-4 left-4 px-4 py-2 bg-black/60 backdrop-blur-md rounded-xl text-sm font-medium text-white"
              >
                Before
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-4 right-4 px-4 py-2 bg-black/60 backdrop-blur-md rounded-xl text-sm font-medium text-white"
              >
                After
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Drag Hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-3 bg-black/70 backdrop-blur-xl rounded-2xl text-white font-medium shadow-2xl flex items-center gap-3"
            >
              <FontAwesomeIcon icon={faArrowsLeftRight} className="text-lg" />
              <span>Drag to compare</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="p-6">
        <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
        <p className="text-gray-300/90">{description}</p>
      </div>
    </motion.div>
  );
}
