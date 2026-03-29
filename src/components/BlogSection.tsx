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
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";

const posts = [
{src: gallery6, date: "15 березня 2026", caption: "А ми вже обрали весільні обручки ♾️" },
    { src: gallery1, date: "31 грудня 2025", caption:"Перед Новим роком відвідали Ukraine WOW 🎄" },
   { src: gallery2, date: "28 грудня 2025", caption: "З Днем народження, кохано ❤️" },
  { src: gallery8, date: "06 грудня 2025", caption: "На рочку Марка - у колі найближчих друзів 🤍" },
  { src: gallery7, date: "09 листопада 2025", caption: "На вінчанні Івана і Тетяни 🕊️" },
  { src: gallery5, date: "02 листопада 2025", caption: "Чудова прогулянка у Феофанії 🌿" },
  
    
];

const BlogSection = () => {
  return (
    <section className="wedding-section text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="wedding-subheading text-muted-foreground mb-2">Моменти щастя</p>
        <h2 className="wedding-heading text-foreground mb-4">Наш фотоблог</h2>
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
            {posts.map((post, i) => (
              <CarouselItem key={i}>
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={post.src}
                    alt={post.caption}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="w-full aspect-square object-cover"
                  />
                </div>
                <p className="text-xs tracking-widest uppercase text-accent mt-4">
                  {post.date}
                </p>
                <p className="wedding-body text-muted-foreground mt-1 px-2 italic">
                  {post.caption}
                </p>
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

export default BlogSection;
