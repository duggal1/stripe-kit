import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { Spotlight } from '@/components/ui/spotlight';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Modern SaaS Platform',
  description: 'Enterprise-level SaaS solution with seamless payment integration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <Spotlight className="-top-40 left-0 md:left-60" fill="blue" />
          {children}
          <Toaster position="bottom-right" />
        
      </body>
    </html>
  );
}