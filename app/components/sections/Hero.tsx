'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import '../../i18n/client';

export default function Hero({ lng }: { lng: string }) {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useTranslation('common', { lng });

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero/hero-section.webp"
                    alt="Crazy Garage Hero Background"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                    quality={75} // Optimized quality
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 lg:py-32">
                <div className="max-w-3xl">
                    <h1
                        className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight transition-all duration-700 ease-out drop-shadow-2xl will-change-transform
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        {t('hero.title')}
                    </h1>

                    <p
                        className={`text-base md:text-lg text-gray-200 mb-10 max-w-xl leading-relaxed transition-all duration-700 delay-200 ease-out drop-shadow-lg will-change-transform
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        {t('hero.description')}
                    </p>

                    <div
                        className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-400 ease-out will-change-transform
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        <button
                            className="px-6 py-3 bg-gradient-to-r from-accent to-accent/80 text-primary font-semibold rounded-lg
                            transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20
                            text-sm uppercase tracking-wider"
                        >
                            {t('hero.buttons.polish')}
                        </button>
                        <button
                            className="px-6 py-3 bg-transparent border-2 border-accent/20 text-white font-semibold rounded-lg
                            transform hover:scale-105 transition-all duration-300 hover:border-accent/40 hover:bg-white/5
                            text-sm uppercase tracking-wider"
                        >
                            {t('hero.buttons.gallery')}
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-600 ease-out will-change-transform
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                    <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce" />
                </div>
            </div>
        </section>
    );
}
