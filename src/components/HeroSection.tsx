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
        <div className="absolute inset-0 bg-background/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">

        <motion.h1
          className="wedding-heading text-primary-foreground text-5xl md:text-7xl lg:text-8xl mb-4"
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
          <p className="wedding-subheading text-primary-foreground opacity-80 text-base md:text-lg">
            5 вересня 2026
          </p>
        </motion.div>

      </div>

    </section>
  );
};

export default HeroSection;
