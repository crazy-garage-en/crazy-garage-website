import { useTranslation } from '@/app/i18n';
import GalleryGrid from '@/app/components/sections/GalleryGrid';

export default async function GalleryPage({
    params: { lng },
}: {
    params: { lng: string };
}) {
    const { t } = await useTranslation(lng, 'common');

    return (
        <section className="py-24 lg:py-32 bg-gradient-to-b from-primary via-primary/95 to-primary relative overflow-hidden">
            {/* Background gradient effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-30" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-16 lg:mb-24">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        {t('gallery.title')}
                    </h1>
                    <p className="text-xl text-gray-300/90 max-w-2xl mx-auto">
                        {t('gallery.description')}
                    </p>
                    <div className="w-24 h-1.5 bg-accent/50 mx-auto mt-8 rounded-full" />
                </div>

                {/* Gallery Grid Component */}
                <GalleryGrid lng={lng} />
            </div>
        </section>
    );
} 