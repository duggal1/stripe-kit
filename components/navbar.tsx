'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Sparkles, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const navigation = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
    { name: 'Documentation', href: '/docs' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="top-0 z-50 fixed w-full"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-transparent backdrop-blur-2xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.1),transparent)]" />
      <motion.div 
        className="-top-40 sm:-top-80 -z-10 absolute inset-x-0 blur-3xl transform-gpu overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative left-[calc(50%-11rem)] sm:left-[calc(50%-30rem)] bg-gradient-to-tr from-primary to-violet-500 opacity-20 w-[36.125rem] sm:w-[72.1875rem] -translate-x-1/2 aspect-[1155/678] rotate-[30deg]" />
      </motion.div>

      <nav className="relative flex justify-between items-center mx-auto px-6 h-20 container">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="group-hover:scale-150 absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 blur-xl rounded-full transition-all duration-500" />
              <div className="group-hover:ring-white/20 relative bg-gradient-to-b from-primary/40 to-primary/5 p-2.5 rounded-full ring-1 ring-white/10 transition-all duration-300">
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              </div>
            </div>
            <span className="bg-clip-text bg-gradient-to-r from-white via-white to-white/80 pl-10 max-h-0 font-bold text-lg text-transparent tracking-tight animate-text-shimmer">
              Stripe Kit
            </span>
          </Link>
          
          <div className="md:flex items-center gap-8 hidden">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="relative text-sm text-white/70 hover:text-white transition-all duration-300 group"
                >
                  <span className="relative z-10 font-medium">{item.name}</span>
                  <span className="group-hover:scale-x-100 -bottom-1 absolute inset-x-1 bg-gradient-to-r from-primary/50 to-violet-500/50 h-px transform transition-transform duration-300 scale-x-0" />
                  <span className="absolute -inset-x-3 -inset-y-2 bg-white/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="md:flex items-center gap-6 hidden">
            <ModeToggle />
           
            <Button 
              className="relative bg-[length:200%_auto] bg-gradient-to-r from-primary via-violet-500 to-primary hover:bg-right-bottom font-medium text-sm duration-500 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] hover:bg-[position:-100%_0,0_0] transition-[background-position] duration-[1.5s] ease-in-out" />
              <span className="relative">Get Started</span>
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                className="relative group"
              >
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 blur rounded-full transition-all duration-300" />
                <div className="group-hover:ring-white/20 absolute inset-0 rounded-full ring-1 ring-white/10 transition-all duration-300" />
                <Menu className="relative w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="border-white/10 bg-black/95 backdrop-blur-3xl">
              <div className="flex flex-col gap-6 mt-10">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 font-medium text-lg text-white/70 hover:text-white transition-colors group"
                    >
                      <span className="relative">
                        {item.name}
                        <span className="group-hover:scale-x-100 -bottom-1 absolute inset-x-0 bg-gradient-to-r from-primary/50 to-violet-500/50 h-px transform transition-transform duration-300 scale-x-0" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col gap-3 mt-6"
                >
                  <Button 
                    variant="ghost" 
                    className="relative w-full group"
                  >
                    <div className="group-hover:bg-white/10 absolute inset-0 bg-white/5 rounded-lg transition-all duration-300" />
                    <div className="group-hover:ring-white/20 absolute inset-0 rounded-lg ring-1 ring-white/10 transition-all duration-300" />
                    <span className="relative font-medium">Sign in</span>
                  </Button>
                  <Button className="relative bg-[length:200%_auto] bg-gradient-to-r from-primary via-violet-500 to-primary hover:bg-right-bottom w-full duration-500 overflow-hidden group">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] hover:bg-[position:-100%_0,0_0] transition-[background-position] duration-[1.5s] ease-in-out" />
                    <span className="relative font-medium">Get Started</span>
                  </Button>
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}