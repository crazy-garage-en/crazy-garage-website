'use client';

import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCarSide,
    faLightbulb,
    faTools,
    faEye,
    faCouch,
    faCheck,
    faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import '../../i18n/client';

interface ServiceCardProps {
    icon: typeof faCarSide;
    title: string;
    description: string;
    features: string[];
    delay: number;
}

// Memoize ServiceCard for better performance
const ServiceCard = memo(({
    icon,
    title,
    description,
    features,
    delay,
}: ServiceCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, delay: delay * 0.1 }}
            className="group relative bg-secondary/30 backdrop-blur-xl rounded-2xl p-8 hover:bg-secondary/40 transition-all duration-300 border border-white/5 shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Gradient overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-6 transform transition-transform duration-300 group-hover:scale-110">
                    <FontAwesomeIcon icon={icon} className="text-2xl text-accent" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
                <p className="text-gray-300/90 mb-8">{description}</p>

                {/* Features */}
                <ul className="space-y-4 mb-8 flex-grow">
                    {features.map((feature, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.2, delay: delay * 0.1 + index * 0.05 }}
                            className="flex items-center gap-4 text-gray-300/90"
                        >
                            <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className="text-accent text-xs"
                                />
                            </div>
                            <span className="text-base">{feature}</span>
                        </motion.li>
                    ))}
                </ul>

                <motion.a
                    href="#gallery"
                    className="inline-flex items-center gap-3 text-accent hover:text-white transition-all duration-300 group/link mt-auto text-lg font-medium"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                >
                    <span>View in Gallery</span>
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-sm transition-all duration-300 group-hover/link:translate-x-1"
                    />
                </motion.a>
            </div>
        </motion.div>
    );
});

ServiceCard.displayName = 'ServiceCard';

export default function Services({ lng }: { lng: string }) {
    const { t } = useTranslation('common', { lng });

    const services = [
        {
            icon: faCarSide,
            titleKey: 'services.items.polish.title',
            descriptionKey: 'services.items.polish.description',
            featuresKey: 'services.items.polish.features',
        },
        {
            icon: faLightbulb,
            titleKey: 'services.items.headlights.title',
            descriptionKey: 'services.items.headlights.description',
            featuresKey: 'services.items.headlights.features',
        },
        {
            icon: faTools,
            titleKey: 'services.items.restoration.title',
            descriptionKey: 'services.items.restoration.description',
            featuresKey: 'services.items.restoration.features',
        },
        {
            icon: faEye,
            titleKey: 'services.items.angel.title',
            descriptionKey: 'services.items.angel.description',
            featuresKey: 'services.items.angel.features',
        },
        {
            icon: faCouch,
            titleKey: 'services.items.interior.title',
            descriptionKey: 'services.items.interior.description',
            featuresKey: 'services.items.interior.features',
        },
    ];

    return (
        <section
            id="services"
            className="py-24 lg:py-32 bg-gradient-to-b from-primary via-primary/95 to-primary relative overflow-hidden"
        >
            {/* Background gradient effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-30" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.3 }}
                    className="text-center mb-16 lg:mb-24"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        {t('services.title')}
                    </h2>
                    <p className="text-xl text-gray-300/90 max-w-2xl mx-auto">
                        {t('services.description')}
                    </p>
                    <div className="w-24 h-1.5 bg-accent/50 mx-auto mt-8 rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            icon={service.icon}
                            title={t(service.titleKey)}
                            description={t(service.descriptionKey)}
                            features={t(service.featuresKey, { returnObjects: true }) as string[]}
                            delay={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
