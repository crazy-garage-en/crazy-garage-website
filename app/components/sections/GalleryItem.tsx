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
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!isDragging || !containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      
      const clientX = 'touches' in event 
        ? event.touches[0].clientX 
        : event.clientX;
      
      const position = ((clientX - rect.left) / rect.width) * 100;
      const clampedPosition = Math.min(Math.max(position, 0), 100);
      
      setSliderPosition(clampedPosition);
    },
    [isDragging]
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMove]);

  // Optimize hint timer
  useEffect(() => {
    if (!showHint) return;
    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, [showHint]);

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };
  const handleMouseEnter = () => setIsHovered(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, delay: delay * 0.1 }}
      className="group relative bg-secondary/30 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/5 shadow-lg"
    >
      {/* Before/After Slider Container */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] select-none touch-none cursor-col-resize bg-secondary/50"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
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
            className={`object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            quality={75}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoadingComplete={() => setIsLoaded(true)}
          />
        </div>

        {/* Before Image (Overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            WebkitClipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          <div className="absolute inset-0">
            <Image
              src={beforeImage}
              alt={`${title} - Before`}
              fill
              className={`object-cover transition-opacity duration-300 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              quality={75}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white/80 backdrop-blur-sm will-change-transform"
          style={{
            left: `${sliderPosition}%`,
            transform: 'translateX(-50%)',
          }}
        >
          {/* Slider Handle */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-xl flex items-center justify-center bg-white/90 transition-colors duration-200 ${
              isDragging ? 'bg-accent' : 'hover:bg-accent/10'
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
        <AnimatePresence mode="wait">
          {(isHovered || isDragging) && (
            <>
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="absolute top-4 left-4 px-4 py-2 bg-black/60 backdrop-blur-md rounded-xl text-sm font-medium text-white"
              >
                Before
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="absolute top-4 right-4 px-4 py-2 bg-black/60 backdrop-blur-md rounded-xl text-sm font-medium text-white"
              >
                After
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Drag Hint */}
        <AnimatePresence mode="wait">
          {showHint && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
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
