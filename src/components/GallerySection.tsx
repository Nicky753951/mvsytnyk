import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const photos = [
  { src: gallery1, alt: "Наше фото 1" },
  { src: gallery2, alt: "Наше фото 2" },
  { src: gallery3, alt: "Наше фото 3" },
  { src: gallery4, alt: "Наше фото 4" },
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
        className="max-w-3xl mx-auto mt-12 px-12"
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
                    className="w-full h-[500px] object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </motion.div>
    </section>
  );
};

export default GallerySection;
