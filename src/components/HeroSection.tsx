import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Весільний фон"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        {/* Додано трохи темніший оверлей для кращого контрасту тексту */}
        <div className="absolute inset-0 bg-black/10 md:bg-black/5" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.h1
          className="wedding-heading text-foreground text-5xl md:text-7xl lg:text-8xl mb-4 drop-shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          Микола
          <span className="block font-display italic text-3xl md:text-4xl lg:text-5xl my-3 font-light opacity-90">
            та
          </span>
          Вікторія
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          {/* Дата тепер жирніша (font-semibold), чіткіша (text-foreground) та з великим інтервалом */}
          <p className="font-sans text-foreground font-semibold text-lg md:text-xl tracking-[0.3em] uppercase mt-6 drop-shadow-md">
            5 вересня 2026
          </p>
          
          {/* Можна також додати місто для балансу композиції */}
          <p className="text-foreground/80 text-sm md:text-base tracking-[0.1em] mt-2">
            КИЇВ
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
