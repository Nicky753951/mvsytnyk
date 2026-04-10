import { Heart, BookOpen, Music } from "lucide-react";
import { useState, useEffect } from "react";
import { WEDDING_DATE } from "./CountdownSection";
import GuestbookPopup from "./GuestbookPopup";
import MusicRequestPopup from "./MusicRequestPopup";

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
  const [guestbookOpen, setGuestbookOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);

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
      {/* Countdown */}
      <p className="font-display text-lg text-primary-foreground/70 mb-6">
        До нашого свята залишилось:
      </p>
      <div className="flex justify-center gap-8 md:gap-14 mb-10">
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

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
        <button
          onClick={() => setGuestbookOpen(true)}
          className="inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-3 font-sans text-xs tracking-[0.3em] uppercase hover:bg-primary-foreground hover:text-foreground transition-colors duration-300"
        >
          <BookOpen className="w-4 h-4" />
          Залиште побажання
        </button>
        <button
          onClick={() => setMusicOpen(true)}
          className="inline-flex items-center gap-2 border border-accent/50 text-accent px-8 py-3 font-sans text-xs tracking-[0.3em] uppercase hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
        >
          <Music className="w-4 h-4" />
          Оберіть пісню
        </button>
      </div>

      <Heart className="w-5 h-5 text-accent mx-auto mb-4" strokeWidth={1.2} />
      <p className="font-display text-2xl text-primary-foreground mb-2">Микола & Вікторія</p>
      <p className="font-sans text-xs tracking-widest uppercase text-primary-foreground/60">
        5 вересня 2026 · Ресторан «Софіївський посад»
      </p>

      <GuestbookPopup open={guestbookOpen} onClose={() => setGuestbookOpen(false)} />
      <MusicRequestPopup open={musicOpen} onClose={() => setMusicOpen(false)} />
    </footer>
  );
};

export default FooterSection;
