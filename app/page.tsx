import { PricingSection } from '@/components/pricing-section';


export default function Home() {
  return (
    <main className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-12">
        <PricingSection />
      </div>
    </main>
  );
}