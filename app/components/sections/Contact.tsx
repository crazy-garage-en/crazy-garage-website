'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faPhone,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const InfoCard = ({
  icon,
  title,
  content,
  links,
  delay,
}: {
  icon: typeof faClock;
  title: string;
  content: string | React.ReactNode;
  links?: {
    icon: typeof faWhatsapp;
    text: string;
    href: string;
    type: 'whatsapp' | 'phone';
  }[];
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.2 }}
      className="bg-secondary/30 backdrop-blur-xl rounded-2xl p-8 border border-white/5 shadow-lg group hover:bg-secondary/40 transition-all duration-500 text-center"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 mx-auto transform-gpu transition-all duration-500 group-hover:scale-110 group-hover:bg-accent/15 group-hover:shadow-lg group-hover:shadow-accent/5">
          <FontAwesomeIcon
            icon={icon}
            className="text-accent text-3xl transition-all duration-500 group-hover:scale-110"
          />
        </div>

        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
          {title}
        </h3>

        {typeof content === 'string' ? (
          <p className="text-gray-300/90 text-xl mb-8 whitespace-pre-line leading-relaxed">
            {content}
          </p>
        ) : (
          <div className="mb-8 transform-gpu transition-all duration-500 group-hover:scale-105">
            {content}
          </div>
        )}

        {links && (
          <div className="flex flex-col gap-4 max-w-xs mx-auto">
            {links.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target={link.type === 'whatsapp' ? '_blank' : undefined}
                rel={
                  link.type === 'whatsapp' ? 'noopener noreferrer' : undefined
                }
                className={`inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl transition-all duration-300 group/link font-medium text-lg ${
                  link.type === 'whatsapp'
                    ? 'bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20'
                    : 'bg-accent/10 text-accent hover:bg-accent/20'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FontAwesomeIcon
                  icon={link.icon}
                  className="text-xl transition-transform duration-300 group-hover/link:scale-110"
                />
                <span>{link.text}</span>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function Contact() {
  const phoneNumber = '+38976276666';

  return (
    <section
      id="contact"
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
            Contact Us
          </h2>
          <p className="text-xl text-gray-300/90 max-w-2xl mx-auto">
            Get in touch with us for premium car detailing services
          </p>
          <div className="w-24 h-1.5 bg-accent/50 mx-auto mt-8 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-8 order-2 lg:order-1">
            <InfoCard
              icon={faClock}
              title="Working Hours"
              content="Contact us for\ncurrent availability"
              delay={0}
            />

            <InfoCard
              icon={faPhone}
              title="Contact Us"
              content={
                <a
                  href={`tel:${phoneNumber}`}
                  className="text-3xl font-bold text-accent hover:text-white transition-colors duration-300 inline-block hover:scale-105"
                >
                  {phoneNumber}
                </a>
              }
              links={[
                {
                  icon: faWhatsapp,
                  text: 'WhatsApp',
                  href: `https://wa.me/${phoneNumber.replace('+', '')}`,
                  type: 'whatsapp',
                },
                {
                  icon: faPhone,
                  text: 'Call Us',
                  href: `tel:${phoneNumber}`,
                  type: 'phone',
                },
              ]}
              delay={0.2}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="order-1 lg:order-2 lg:h-full"
          >
            <div className="relative w-full h-[500px] lg:h-full rounded-2xl overflow-hidden border border-white/5 shadow-lg bg-secondary/30 backdrop-blur-sm">
              {/* Map Title */}
              <div className="absolute top-0 left-0 right-0 z-10 bg-secondary/95 backdrop-blur-xl px-6 py-4 text-center border-b border-white/5">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-accent text-lg"
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-white">
                      Our Location
                    </h3>
                    <p className="text-sm text-gray-300/90">
                      Crazy Garage EN, Struga, North Macedonia
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Container */}
              <div className="absolute top-[72px] left-0 right-0 bottom-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2987.7041858493247!2d20.523869776029928!3d41.52236097162282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135111bf674dc7b7%3A0x494d6ce192f60c68!2sCrazy%20garage%20EN!5e0!3m2!1sen!2sus!4v1710351245140!5m2!1sen!2sus"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Crazy Garage Location"
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              {/* Map Overlay for better touch interaction */}
              <div className="absolute inset-0 pointer-events-none border-4 border-accent/5 rounded-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
