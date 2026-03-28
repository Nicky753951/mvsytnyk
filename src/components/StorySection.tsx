import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Counter from "./Counter";

const events = [
  { date: "Вересень 2017", title: "Перша зустріч", text: "Ми зустрілися на весіллі Ігоря та Віки (наших теперішніх кумів)." },
  { date: "Січень 2025", title: "Перше побачення", text: "Романтичні вихідні зимовим Києвом: засніжений ВДНГ, ароматна кава та розмови до вечора." },
  { date: "Грудень 2025", title: "Пропозиція", text: "Villa Riviera, берег Дніпра і одна каблучка — Вікторія сказала «Так»!"},
  { date: "Вересень 2026", title: "Наше весілля", text: "Найважливіший розділ нашої історії, який ми хочемо написати разом з вами." },
];

const StorySection = () => {
  return (
    <section className="wedding-section text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="wedding-subheading text-muted-foreground mb-2">Як все почалось</p>
        <h2 className="wedding-heading text-foreground mb-4">Наша історія</h2>
        <div className="gold-divider" />
      </motion.div>

      <div className="max-w-2xl mx-auto mt-16 relative mb-20">
        {/* Timeline line */}
        <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-border hidden md:block" />

        {events.map((event, i) => (
          <motion.div
            key={i}
            className="relative mb-16 last:mb-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-secondary items-center justify-center z-10">
              <Heart className="w-3 h-3 text-primary" />
            </div>
            <div className={`md:w-5/12 ${i % 2 === 0 ? "md:mr-auto md:pr-12 md:text-right" : "md:ml-auto md:pl-12 md:text-left"}`}>
              <p className="font-sans text-xs tracking-widest uppercase text-accent mb-2">{event.date}</p>
              <h3 className="font-display text-2xl text-foreground mb-2">{event.title}</h3>
              <p className="wedding-body text-muted-foreground">{event.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Каунтер всередині секції */}
      <Counter />
    </section>
  );
};

export default StorySection;
