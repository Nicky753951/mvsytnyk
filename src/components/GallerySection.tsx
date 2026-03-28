import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import gallery1 from "@/assets/gallery-1.jpg";

const photos = [
  { src: gallery1, alt: "Наше фото 1" },
];

const GallerySection = () => {
  return (
    <section className="wedding-section text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="wedding-subheading text-muted-foreground mb-2">Моменти щастя</p>
        <h2 className="wedding-heading text-foreground mb-4">Наші фото</h2>
        <div className="gold-divider" />
      </motion.div>

      <motion.div
        className="max-w-3xl mx-auto mt-8 md:mt-12 px-4 md:px-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Carousel opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {photos.map((photo, i) => (
              <CarouselItem key={i}>
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    width={800}
                    height={1024}
                    className="w-full aspect-square object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center gap-4 mt-4 md:hidden">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
          <div className="hidden md:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </motion.div>
    </section>
  );
};

export default GallerySection;
