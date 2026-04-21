import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import FallingPetals from "./FallingPetals";
import RevealText from "./RevealText";
import ConfettiBurst from "./ConfettiBurst";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [clicks, setClicks] = useState(0);
  const [burst, setBurst] = useState(0);
  const [origin, setOrigin] = useState<{ x: number; y: number } | undefined>();
  const resetTimer = useRef<number | null>(null);

  const handleNamesClick = useCallback((e: React.MouseEvent) => {
    setOrigin({ x: e.clientX, y: e.clientY });
    setClicks((prev) => {
      const next = prev + 1;
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => setClicks(0), 2500);
      if (next >= 5) {
        setBurst((b) => b + 1);
        return 0;
      }
      return next;
    });
  }, []);

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

      {/* Falling petals */}
      <FallingPetals count={20} />

      {/* Confetti easter egg */}
      <ConfettiBurst trigger={burst} origin={origin} />

      {/* Content */}
      <motion.div className="relative z-10 text-center px-6" style={{ y: contentY, opacity }}>
        <h1
          className="wedding-heading text-foreground text-5xl md:text-7xl lg:text-8xl mb-4 cursor-pointer select-none"
          onClick={handleNamesClick}
          title="Клікни 5 разів 🎉"
        >
          <RevealText text="Микола" as="span" delay={0.4} />
          <RevealText
            text="та"
            as="span"
            delay={1.1}
            className="block font-display italic text-3xl md:text-4xl lg:text-5xl my-3 font-light opacity-80"
          />
          <RevealText text="Вікторія" as="span" delay={1.5} />
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <p className="wedding-subheading text-foreground text-base md:text-lg mb-8">
            5 вересня 2026
          </p>

          <motion.a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdXoBLxyQdhKxSQM3B_I_G35uNGG2QRxtOMuNm4epk75Jnh0Q/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-3 border border-foreground bg-foreground text-background transition-all duration-300 rounded-full text-sm md:text-base tracking-widest uppercase font-semibold shadow-lg hover:shadow-xl"
          >
            Підтвердити участь
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
