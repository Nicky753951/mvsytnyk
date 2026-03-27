import { motion } from "framer-motion";
import { Wine, Palette } from "lucide-react";

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
        <p className="wedding-subheading text-primary-foreground/60 mb-2">Побажання</p>
        <h2 className="wedding-heading text-primary-foreground mb-4">Важливі деталі</h2>
        <div className="w-24 h-px bg-accent mx-auto my-8" />
      </motion.div>

      <div className="max-w-2xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {wishes.map((w, i) => (
          <motion.div
            key={i}
            className="p-8 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <w.icon className="w-10 h-10 text-accent mx-auto mb-5" strokeWidth={1.2} />
            <h3 className="font-display text-2xl text-primary-foreground mb-3">{w.title}</h3>
            <p className="font-body text-lg text-primary-foreground/70 leading-relaxed">{w.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WishesSection;
