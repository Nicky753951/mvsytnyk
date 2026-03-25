import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import floralBottom from "@/assets/floral-bottom.png";

const RsvpSection = () => {
  const [form, setForm] = useState({ name: "", guests: "1", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Дякуємо! Ваше підтвердження отримано 💕");
    setForm({ name: "", guests: "1", message: "" });
  };

  return (
    <section id="rsvp" className="wedding-section text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="wedding-subheading text-muted-foreground mb-2">Чекаємо на вас</p>
        <h2 className="wedding-heading text-foreground mb-4">Підтвердіть присутність</h2>
        <div className="gold-divider" />
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-12 space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div>
          <input
            type="text"
            required
            placeholder="Ваше ім'я"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border-b border-border bg-transparent py-3 text-center font-body text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <select
            value={form.guests}
            onChange={(e) => setForm({ ...form, guests: e.target.value })}
            className="w-full border-b border-border bg-transparent py-3 text-center font-body text-lg text-foreground focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
          >
            <option value="1">1 гість</option>
            <option value="2">2 гості</option>
            <option value="3">3 гості</option>
            <option value="4">4 гості</option>
          </select>
        </div>
        <div>
          <textarea
            placeholder="Побажання (необов'язково)"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={3}
            className="w-full border-b border-border bg-transparent py-3 text-center font-body text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
          />
        </div>
        <button
          type="submit"
          className="inline-block border border-foreground/30 text-foreground px-12 py-3 font-sans text-xs tracking-[0.3em] uppercase hover:bg-foreground hover:text-background transition-colors duration-300 mt-4"
        >
          Надіслати
        </button>
      </motion.form>

      <img
        src={floralBottom}
        alt=""
        className="w-64 md:w-80 mx-auto mt-20 opacity-70"
        loading="lazy"
        width={1200}
        height={512}
      />
    </section>
  );
};

export default RsvpSection;
