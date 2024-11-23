import { PricingSection } from '@/components/pricing-section';
import Particles from '@/components/ui/particles';


export default function Home() {
  return (
    <main className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-12">
      <Particles
        className="absolute inset-0 opacity-40"
        quantity={100}
        ease={100}
        color="#ffffff"
        refresh={false}
      />
        <PricingSection />
      </div>
    </main>
  );
}