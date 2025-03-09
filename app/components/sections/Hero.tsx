'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

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
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-1000 ease-out
              ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
          >
            Bringing Your Ride Back to Life!
          </h1>

          <p
            className={`text-lg md:text-xl text-gray-200 mb-8 max-w-2xl transition-all duration-1000 delay-300 ease-out
              ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
          >
            Experience premium car detailing and headlight restoration services
            that will transform your vehicle's appearance
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-500 ease-out
              ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
          >
            <button
              className="px-8 py-4 bg-gradient-to-r from-accent to-accent/80 text-primary font-semibold rounded-lg
                transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20
                text-sm uppercase tracking-wider"
            >
              Get Your Car Polished
            </button>
            <button
              className="px-8 py-4 bg-transparent border-2 border-accent/20 text-white font-semibold rounded-lg
                transform hover:scale-105 transition-all duration-300 hover:border-accent/40 hover:bg-white/5
                text-sm uppercase tracking-wider"
            >
              View Our Work
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-700
          ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
