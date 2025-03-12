'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRight,
    faArrowsLeftRight,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '../../i18n/client';

interface GalleryItemProps {
    itemKey: string;
    beforeImage: string;
    afterImage: string;
    delay: number;
    lng: string;
}

const GalleryItem = ({
    itemKey,
    beforeImage,
    afterImage,
    delay,
    lng
}: GalleryItemProps) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation('common', { lng });

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
                        alt={t(`gallery.items.${itemKey}.title`) + ' - ' + t('gallery.comparison.after')}
                        fill
                        className={`object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        quality={100}
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onLoad={() => setIsLoaded(true)}
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
                            alt={t(`gallery.items.${itemKey}.title`) + ' - ' + t('gallery.comparison.before')}
                            fill
                            className={`object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
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
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-colors duration-200 ${isDragging ? 'bg-accent shadow-accent/20' : 'bg-white hover:bg-accent/5'}`}
                    >
                        <FontAwesomeIcon
                            icon={faArrowsLeftRight}
                            className={`text-base transition-colors ${isDragging ? 'text-white' : 'text-primary'}`}
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
                                {t('gallery.comparison.before')}
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-4 right-4 px-4 py-2 bg-black/60 backdrop-blur-md rounded-xl text-sm font-medium text-white"
                            >
                                {t('gallery.comparison.after')}
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
                            <span>{t('gallery.comparison.dragToCompare')}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Info */}
            <div className="p-6">
                <h4 className="text-xl font-bold text-white mb-2">
                    {t(`gallery.items.${itemKey}.title`)}
                </h4>
                <p className="text-gray-300/90">
                    {t(`gallery.items.${itemKey}.description`)}
                </p>
            </div>
        </motion.div>
    );
};

export default function Gallery({ lng }: { lng: string }) {
    const { t } = useTranslation('common', { lng });

    const galleryItems = [
        {
            key: 'doorPanel',
            beforeImage: '/images/gallery/left-side-door-before.JPG',
            afterImage: '/images/gallery/left-side-door-after.JPG',
        },
        {
            key: 'sidePanel',
            beforeImage: '/images/gallery/inside-from-right-before-2.JPG',
            afterImage: '/images/gallery/from-right-side-after.JPG',
        },
        {
            key: 'surface',
            beforeImage: '/images/gallery/before.jpeg',
            afterImage: '/images/gallery/after.jpeg',
        },
    ];

    return (
        <section
            id="gallery"
            className="py-24 lg:py-32 bg-gradient-to-b from-primary via-primary/95 to-primary relative overflow-hidden"
        >
            {/* Background gradient effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-30" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16 lg:mb-24"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        {t('gallery.title')}
                    </h2>
                    <p className="text-xl text-gray-300/90 max-w-2xl mx-auto">
                        {t('gallery.description')}
                    </p>
                    <div className="w-24 h-1.5 bg-accent/50 mx-auto mt-8 rounded-full" />
                </motion.div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {galleryItems.map((item, index) => (
                        <GalleryItem
                            key={item.key}
                            itemKey={item.key}
                            beforeImage={item.beforeImage}
                            afterImage={item.afterImage}
                            delay={index}
                            lng={lng}
                        />
                    ))}
                </div>

                {/* View Full Gallery CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-300/90 mb-6">
                        {t('gallery.explore')}
                    </p>
                    <Link
                        href={`/${lng}/gallery`}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-accent/10 text-accent hover:bg-accent/20 transition-all duration-300 rounded-xl font-medium text-lg group"
                    >
                        <span>{t('gallery.viewMore')}</span>
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className="text-sm transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
