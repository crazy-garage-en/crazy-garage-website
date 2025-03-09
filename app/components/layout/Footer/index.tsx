'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebook,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const socialLinks = [
  {
    name: 'Instagram',
    icon: faInstagram,
    href: 'https://www.instagram.com/crazy_garage_en',
    color: 'hover:text-[#E4405F]',
  },
  {
    name: 'Facebook',
    icon: faFacebook,
    href: 'https://www.facebook.com/people/Crazy-garage-en/100092218542079/',
    color: 'hover:text-[#1877F2]',
  },
  {
    name: 'TikTok',
    icon: faTiktok,
    href: 'https://www.tiktok.com/@crazy_garage_en',
    color: 'hover:text-[#000000]',
  },
];

const quickLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/30 backdrop-blur-xl border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left space-y-3"
          >
            <h3 className="text-xl font-bold text-white">Crazy Garage</h3>
            <p className="text-gray-300/90 leading-relaxed text-sm">
              Professional car detailing services in Debar. Transform your
              vehicle with our expert care and attention to detail.
            </p>
            <p className="text-sm font-medium text-accent/90">
              Your car deserves the best treatment
            </p>
            <a
              href="mailto:info@crazygarage.mk"
              className="inline-block text-accent hover:text-white transition-colors duration-300 text-sm"
            >
              info@crazygarage.mk
            </a>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center md:text-left space-y-3"
          >
            <h3 className="text-xl font-bold text-white">Quick Links</h3>
            <div className="flex flex-col items-center md:items-start gap-2.5">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="w-[160px]"
                >
                  <Link
                    href={link.href}
                    className="text-gray-300/90 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/15">
                      <span className="w-1.5 h-1.5 bg-accent/50 rounded-full transition-all duration-300 group-hover:w-2" />
                    </span>
                    <span className="ml-3 text-sm">{link.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Connect Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center md:text-left space-y-3"
          >
            <h3 className="text-xl font-bold text-white">Connect</h3>
            <div className="flex flex-col items-center md:items-start gap-2.5">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center w-[160px] text-gray-300/90 hover:text-white transition-all duration-300 group ${social.color}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <span className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/15">
                    <FontAwesomeIcon
                      icon={social.icon}
                      className="text-sm transition-transform duration-300 group-hover:scale-110"
                    />
                  </span>
                  <span className="ml-3 text-sm">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 pt-4 border-t border-white/5 text-center"
        >
          <p className="text-gray-300/70 text-xs">
            © {currentYear} Crazy Garage. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
