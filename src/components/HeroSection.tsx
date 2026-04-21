import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0 scale-110" style={{ y: bgY }}>
        <img
          src={heroBg}
          alt="Весільний фон"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-background/20" />
      </motion.div>

      {/* Content */}
      <motion.div className="relative z-10 text-center px-6" style={{ y: contentY, opacity }}>
        <motion.h1
          className="wedding-heading text-foreground text-5xl md:text-7xl lg:text-8xl mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          Микола
          <span className="block font-display italic text-3xl md:text-4xl lg:text-5xl my-3 font-light opacity-80">
            та
          </span>
          Вікторія
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <p className="wedding-subheading text-foreground text-base md:text-lg mb-8">
            5 вересня 2026
          </p>

          {/* Завжди підсвічена кнопка підтвердження */}
          <motion.a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdXoBLxyQdhKxSQM3B_I_G35uNGG2QRxtOMuNm4epk75Jnh0Q/viewform?usp=dialog" // Заміни на потрібне посилання
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }} // Ми залишили легке збільшення при наведенні
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-3 border border-foreground bg-foreground text-background transition-all duration-300 rounded-full text-sm md:text-base tracking-widest uppercase font-semibold shadow-lg hover:shadow-xl"
          >
            Підтвердити участь
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
