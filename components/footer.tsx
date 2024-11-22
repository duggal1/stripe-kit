'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Documentation', href: '/docs' },
        { name: 'Changelog', href: '/changelog' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
        { name: 'Security', href: '/security' },
      ],
    },
  ];
  //added

  return (
    <footer className="relative border-white/10 bg-black backdrop-blur-3xl border-t">
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/80 backdrop-blur-3xl" />
      <div className="relative mx-auto px-6 py-16 container">
        <div className="gap-8 grid grid-cols-2 md:grid-cols-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2"
          >
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 blur-xl rounded-full transition-opacity duration-500" />
                <div className="relative bg-gradient-to-b from-primary/30 to-primary/10 p-2 rounded-full">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
              </div>
              <span className="bg-clip-text bg-gradient-to-r from-white via-white to-white/80 font-bold text-transparent text-xl animate-text-shimmer">
                Stripe Kit
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-white/60">
              Professional SaaS payment flow kit designed for professionals.
            </p>
          </motion.div>
          
          {footerSections.map((section, sectionIndex) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <h3 className="bg-clip-text bg-gradient-to-r from-white via-white to-white/80 font-semibold text-transparent">
                {section.title}
              </h3>
              <ul className="space-y-2 mt-4">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                  >
                    <Link
                      href={link.href}
                      className="relative text-sm text-white/60 hover:text-white transition-colors group"
                    >
                      <span className="relative z-10">{link.name}</span>
                      <span className="group-hover:scale-x-100 -bottom-1 absolute inset-x-0 bg-gradient-to-r from-primary/50 to-violet-500/50 h-px transform transition-transform duration-300 scale-x-0" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative border-white/10 mt-16 pt-8 border-t"
        >
          <div className="flex md:flex-row flex-col justify-between items-center gap-6">
            <p className="text-lg text-white/60 hover:text-white/80 transition-colors">
              © {currentYear} Stripe Kit. Crafted with ❤️
            </p>
            <div className="flex items-center gap-8 text-xl">
              {[
                { 
                  name: '𝕏', 
                  href: 'https://twitter.com/harshitduggal5',
                  hoverClass: 'hover:text-white' 
                },
                { 
                  name: 'GitHub', 
                  href: 'https://github.com/duggal1',
                  hoverClass: 'hover:text-white' 
                },
                { 
                  name: 'Discord', 
                  href: 'https://discord.gg',
                  hoverClass: 'hover:text-white' 
                },
              ].map((social, index) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative text-white/60 transition-all duration-300 ${social.hoverClass} group`}
                  >
                    <span className="relative z-10">{social.name}</span>
                    <span className="group-hover:scale-x-100 -bottom-1 absolute inset-x-0 bg-gradient-to-r from-primary/50 to-violet-500/50 rounded-full h-[2px] transform transition-transform duration-300 scale-x-0" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}