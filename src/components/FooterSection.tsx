import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { WEDDING_DATE } from "./CountdownSection";

function getTimeLeft() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const FooterSection = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const items = [
    { value: timeLeft.days, label: "днів" },
    { value: timeLeft.hours, label: "годин" },
    { value: timeLeft.minutes, label: "хвилин" },
    { value: timeLeft.seconds, label: "секунд" },
  ];

  return (
    <footer className="py-12 text-center bg-foreground">
      <Heart className="w-5 h-5 text-accent mx-auto mb-4" strokeWidth={1.2} />
      <p className="font-display text-2xl text-primary-foreground mb-2">Микола & Вікторія</p>
      <p className="font-sans text-xs tracking-widest uppercase text-primary-foreground/60 mb-10">
        5 вересня 2026 · Ресторан «Софіївський посад»
      </p>

      {/* Countdown */}
      <p
        className="font-display text-lg text-primary-foreground/70 mb-6"
      >
        До нашого свята залишилось:
      </p>
      <div className="flex justify-center gap-8 md:gap-14">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <span className="block font-display text-3xl md:text-4xl text-primary-foreground font-light">
              {item.value}
            </span>
            <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-primary-foreground/50 mt-2">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default FooterSection;
