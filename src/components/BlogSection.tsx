import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

// Імпорт фото (залиште як є)
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const WEDDING_DATE = new Date("2026-09-05T14:00:00");

const posts = [
  { src: gallery3, date: "15 березня 2026", caption: "А ми вже придбали весільні обручки" },
  { src: gallery4, date: "14 березня 2026", caption: "Провели зустріч із ведучою весілля" },
];

const BlogSection = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const diff = WEDDING_DATE.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const countdownItems = [
    { value: timeLeft.days, label: "днів" },
    { value: timeLeft.hours, label: "годин" },
    { value: timeLeft.minutes, label: "хвилин" },
    { value: timeLeft.seconds, label: "секунд" },
  ];

  return (
    <section className="wedding-section py-16">
      {/* Заголовок Блогу */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="wedding-subheading text-muted-foreground mb-2 italic">Підготовка до весілля</p>
        <h2 className="wedding-heading text-4xl md:text-5xl font-serif text-foreground mb-4">Блог</h2>
        <div className="w-24 h-px bg-[#eeb9b9] mx-auto mb-10" />
      </motion.div>

      {/* Карусель Блогу */}
      <motion.div
        className="max-w-3xl mx-auto px-4 md:px-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Carousel opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {posts.map((post, i) => (
              <CarouselItem key={i}>
                <div className="overflow-hidden rounded-xl shadow-sm border border-border/50">
                  <img
                    src={post.src}
                    alt={post.caption}
                    loading="lazy"
                    className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="text-center">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#eeb9b9] mt-6 font-sans">
                    {post.date}
                  </p>
                  <p 
                    className="text-lg text-muted-foreground mt-2 px-2 italic"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {post.caption}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Навігація для мобільних */}
          <div className="flex items-center justify-center gap-4 mt-6 md:hidden">
            <CarouselPrevious className="static translate-y-0 border-[#f7d7d7] text-[#9e8a84]" />
            <CarouselNext className="static translate-y-0 border-[#f7d7d7] text-[#9e8a84]" />
          </div>
          
          {/* Навігація для десктопу */}
          <div className="hidden md:block">
            <CarouselPrevious className="border-[#f7d7d7] text-[#9e8a84]" />
            <CarouselNext className="border-[#f7d7d7] text-[#9e8a84]" />
          </div>
        </Carousel>
      </motion.div>

      {/* Секція Таймера (після блогу) */}
      <motion.div
        className="mt-24 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p 
          className="text-[18px] text-[#6b5e5a] mb-10"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          До нашого свята залишилось:
        </p>
        
        <div className="flex justify-center gap-6 md:gap-14">
          {countdownItems.map((item) => (
            <div key={item.label} className="text-center group">
              <span className="block font-display text-4xl md:text-6xl text-[#6b5e5a] font-light tracking-tighter transition-colors group-hover:text-[#eeb9b9]">
                {item.value}
              </span>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#9e8a84] mt-2">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default BlogSection;
