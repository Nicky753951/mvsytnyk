import { motion } from "framer-motion";
import { Sun, CloudSun, Thermometer, Wind, Droplets } from "lucide-react";

const WeatherWidget = () => {
  return (
    <motion.div
      className="max-w-md mx-auto mt-14"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="rounded-2xl border border-border bg-background p-6 relative overflow-hidden">
        {/* Subtle sun glow */}
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-accent/10 blur-2xl" />

        <div className="relative z-10">
          {/* Header */}
          <p className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground mb-4">
            Очікувана погода · 5 вересня
          </p>

          {/* Main temp + icon */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl text-foreground font-light">+23°</span>
              <span className="font-display text-lg text-muted-foreground">C</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Sun className="w-12 h-12 text-accent" strokeWidth={1} />
              <span className="font-sans text-[10px] tracking-wider uppercase text-muted-foreground">
                Сонячно
              </span>
            </div>
          </div>

          {/* Details row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2.5">
              <Thermometer className="w-4 h-4 text-accent flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-sans text-[9px] tracking-wider uppercase text-muted-foreground">Вечір</p>
                <p className="font-display text-sm text-foreground">+17°</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2.5">
              <Wind className="w-4 h-4 text-accent flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-sans text-[9px] tracking-wider uppercase text-muted-foreground">Вітер</p>
                <p className="font-display text-sm text-foreground">3 м/с</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2.5">
              <Droplets className="w-4 h-4 text-accent flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-sans text-[9px] tracking-wider uppercase text-muted-foreground">Дощ</p>
                <p className="font-display text-sm text-foreground">0%</p>
              </div>
            </div>
          </div>

          {/* Tip */}
          <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-accent/8 border border-accent/15 px-4 py-3">
            <CloudSun className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Зазвичай в цей день в Києві тепло та сонячно 🤍
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherWidget;
