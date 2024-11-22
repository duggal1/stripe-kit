import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { Spotlight } from '@/components/ui/spotlight';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

//added navbar
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Stripe Kit ⚡️",
  description: 'Modern Next.js SaaS starter kit with authentication, payments, and dashboard',
  icons: {
    icon: [
      {
        url: '/favicon.png',
        href: '/favicon.png',
        type: 'image/png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      
          <div className="relative flex flex-col min-h-screen">
            <Navbar />
            <Spotlight className="-top-40 left-0 md:left-60" fill="blue" />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <Toaster position="bottom-right" />
          </div>
      
      </body>
    </html>
  );
}