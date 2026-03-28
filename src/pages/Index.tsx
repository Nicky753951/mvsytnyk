import HeroSection from "@/components/HeroSection";
import CountdownSection from "@/components/CountdownSection";
import StorySection from "@/components/StorySection";
import DetailsSection from "@/components/DetailsSection";
import GallerySection from "@/components/GallerySection";

import WishesSection from "@/components/WishesSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <CountdownSection />
      <StorySection />
      <DetailsSection />
      <GallerySection />
      <WishesSection />
      <FooterSection />
    </main>
  );
};

export default Index;
