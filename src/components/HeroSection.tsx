import { motion } from "framer-motion";
import coupleHero from "@/assets/couple-hero.jpg";
import floralTop from "@/assets/floral-top.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={coupleHero}
          alt="Весільне фото"
          className="w-full h-full object-cover object-[center_30%]"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-foreground/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="wedding-subheading text-primary-foreground mb-6 opacity-90">
            Запрошуємо на наше весілля
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          <img
            src={floralTop}
            alt=""
            className="w-48 md:w-64 mx-auto mb-6 opacity-90"
            width={1200}
            height={600}
          />
        </motion.div>

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
