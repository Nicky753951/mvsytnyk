import HeroSection from "@/components/HeroSection";
import CountdownSection from "@/components/CountdownSection";
import StorySection from "@/components/StorySection";
import VideoSection from "@/components/VideoSection";
import DetailsSection from "@/components/DetailsSection";
import GallerySection from "@/components/GallerySection";
import BlogSection from "@/components/BlogSection";
import WishesSection from "@/components/WishesSection";
import FooterSection from "@/components/FooterSection";
import ScrollToTop from "@/components/ScrollToTop";
import GameButton from "@/components/GameButton";

const Index = () => {
  return (
    <main className="overflow-hidden">
      <ScrollToTop />
      <GameButton />
      <HeroSection />
      <CountdownSection />
      <DetailsSection />
      <StorySection />
      <VideoSection />
      <BlogSection />
      <WishesSection />
      <FooterSection />
    </main>
  );
};

export default Index;
