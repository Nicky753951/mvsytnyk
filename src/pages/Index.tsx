import HeroSection from "@/components/HeroSection";
import CountdownSection from "@/components/CountdownSection";
import StorySection from "@/components/StorySection";
import DetailsSection from "@/components/DetailsSection";
import GallerySection from "@/components/GallerySection";
import BlogSection from "@/components/BlogSection";
import WishesSection from "@/components/WishesSection";
import FooterSection from "@/components/FooterSection";
import ScrollToTop from "@/components/ScrollToTop";
import GameButton from "@/components/GameButton";
import ScrollProgressBar from "@/components/ScrollProgressBar";

const Index = () => {
  return (
    <main className="overflow-hidden">
      <ScrollProgressBar />
      <ScrollToTop />
      <GameButton />
      <HeroSection />
      <CountdownSection />
      <DetailsSection />
      <StorySection />
      <BlogSection />
      <WishesSection />
      <FooterSection />
    </main>
  );
};

export default Index;
