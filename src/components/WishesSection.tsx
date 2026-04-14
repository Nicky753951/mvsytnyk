import { motion } from "framer-motion";
import { Wine, Shirt, Banknote } from "lucide-react";

const wishes = [
  {
    icon: Wine,
    title: "Замість квітів",
    description: "Пляшечка улюбленого алкоголю 🥂",
    gradient: "from-accent/30 to-accent/5",
    iconBg: "bg-accent/20",
    decorElements: (
      <>
        {/* Floating bubbles */}
        <motion.div
          className="absolute top-6 right-8 w-3 h-3 rounded-full bg-accent/20"
          animate={{ y: [-5, 5, -5], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-12 right-14 w-2 h-2 rounded-full bg-accent/15"
          animate={{ y: [-8, 4, -8], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-16 left-8 w-2.5 h-2.5 rounded-full bg-accent/10"
          animate={{ y: [-4, 6, -4], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </>
    ),
  },
  {
    icon: Shirt,
    title: "Дрес-код",
    description: "Білий та чорний 🤍🖤",
    gradient: "from-primary-foreground/10 to-foreground/5",
    iconBg: "bg-primary-foreground/10",
    decorElements: (
      <>
        {/* B&W circles */}
        <motion.div
          className="absolute top-8 right-10 w-8 h-8 rounded-full border border-primary-foreground/10"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-14 left-10 w-5 h-5 rounded-full bg-primary-foreground/5"
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-14 left-12 w-1.5 h-1.5 rounded-full bg-accent/30"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </>
    ),
  },
  {
    icon: Banknote,
    title: "Подарунки",
    description: "Внесок у бюджет молодої родини 💵",
    gradient: "from-accent/20 to-secondary/10",
    iconBg: "bg-accent/15",
    decorElements: (
      <>
        {/* Sparkle dots */}
        <motion.div
          className="absolute top-8 right-12 w-1.5 h-1.5 rounded-full bg-accent/40"
          animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-16 right-8 w-1 h-1 rounded-full bg-accent/30"
          animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        />
        <motion.div
          className="absolute bottom-12 left-10 w-1.5 h-1.5 rounded-full bg-accent/25"
          animate={{ scale: [0, 1.2, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        />
        <motion.div
          className="absolute bottom-20 right-16 w-2 h-2 rounded-full bg-accent/15"
          animate={{ y: [-3, 3, -3], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </>
    ),
  },
];

const WishesSection = () => {
  return (
    <section className="wedding-section bg-foreground text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="wedding-subheading text-primary-foreground/60 mb-2 uppercase tracking-widest text-xs">
          Побажання
        </p>
        <h2 className="wedding-heading text-primary-foreground text-4xl md:text-5xl mb-4 font-display">
          Важливі деталі
        </h2>
        <div className="w-24 h-px bg-accent mx-auto my-8 opacity-50" />
      </motion.div>

      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
        {wishes.map((w, i) => (
          <motion.div
            key={i}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${w.gradient} border border-primary-foreground/8 p-8 flex flex-col items-center group cursor-default`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
          >
            {/* Decorative animated elements */}
            {w.decorElements}

            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Icon */}
            <motion.div
              className={`relative z-10 w-16 h-16 rounded-2xl ${w.iconBg} flex items-center justify-center mb-5`}
              whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.5 } }}
            >
              <w.icon className="w-7 h-7 text-accent" strokeWidth={1.2} />
            </motion.div>

            {/* Title */}
            <h3 className="relative z-10 font-display text-xl text-primary-foreground mb-3">
              {w.title}
            </h3>

            {/* Short description */}
            <p className="relative z-10 font-body text-base text-primary-foreground/60 leading-relaxed">
              {w.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WishesSection;
