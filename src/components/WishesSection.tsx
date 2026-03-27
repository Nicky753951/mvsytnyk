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
    // Виправлено: текст в один рядок, щоб JS не видавав помилку
    description: "Ми не хочемо обтяжувати Вас вибором подарунків, тому будемо вдячні за внесок у бюджет нашої молодої родини",
  }
];

const WishesSection = () => {
  return (
    <section className="wedding-section bg-foreground text-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="wedding-subheading text-primary-foreground/60 mb-2 uppercase tracking-widest text-sm">Побажання</p>
        <h2 className="wedding-heading text-primary-foreground text-4xl md:text-5xl mb-4 font-display">Важливі деталі</h2>
        <div className="w-24 h-px bg-accent mx-auto my-8 opacity-50" />
      </motion.div>

      {/* grid-cols-3 ідеально підходить для 3-х карток */}
      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {wishes.map((w, i) => (
          <motion.div
            key={i}
            className="p-8 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <w.icon className="w-10 h-10 text-accent mx-auto mb-6" strokeWidth={1.2} />
            <h3 className="font-display text-2xl text-primary-foreground mb-4">{w.title}</h3>
            <p className="font-body text-lg text-primary-foreground/70 leading-relaxed">{w.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WishesSection;
