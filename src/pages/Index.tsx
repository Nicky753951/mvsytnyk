import HeroSection from "@/components/HeroSection";
import CountdownSection from "@/components/CountdownSection";
import StorySection from "@/components/StorySection";
import DetailsSection from "@/components/DetailsSection";
import GallerySection from "@/components/GallerySection";
import BlogSection from "@/components/BlogSection";
import WishesSection from "@/components/WishesSection";
import FooterSection from "@/components/FooterSection";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <main className="overflow-hidden">
      <ScrollToTop />
      <HeroSection />
      <CountdownSection />
      <StorySection />
      <DetailsSection />
      <BlogSection />
      <WishesSection />
      <FooterSection />
    </main>
  );
};

export default Index;
