import { motion } from "framer-motion";
import { Wine, Palette, Banknote } from "lucide-react";

const wishes = [
  {
    icon: Wine,
    title: "Замість квітів",
    description: "Будемо вдячні, якщо замість квітів ви подаруєте пляшечку улюбленого алкоголю 🥂",
  },
  {
    icon: Palette,
    title: "Дрес-код",
    description: "Наше свято у кольорах — білий та чорний 🤍🖤",
  },
  {
    icon: Banknote,
    title: "Подарунки",
    description: `Ми не хочемо обтяжувати Вас вибором подарунків, тому будемо вдячні за внесок у бюджет нашої молодої родини 💵`,
  }
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

      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {wishes.map((w, i) => (
          <motion.div
            key={i}
            className="p-8 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 flex flex-col items-center transition-all hover:bg-primary-foreground/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <w.icon className="w-10 h-10 text-accent mb-6 shrink-0" strokeWidth={1.2} />
            <h3 className="font-display text-2xl text-primary-foreground mb-4">
              {w.title}
            </h3>
            <p className="font-body text-lg text-primary-foreground/70 leading-relaxed">
              {w.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WishesSection;
