import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const WEDDING_DATE = new Date("2026-09-05T14:00:00");

// Оновлений стиль: розмір 18px, без курсиву (not-italic)
const TEXT_STYLE = "text-[22px] mb-10 max-w-xl mx-auto leading-relaxed not-italic text-[#6b5e5a]";

const WeddingCalendar = () => {
  const days = [
    null, 1, 2, 3, 4, 5, 6, 
    7, 8, 9, 10, 11, 12, 13, 
    14, 15, 16, 17, 18, 19, 20, 
    21, 22, 23, 24, 25, 26, 27, 
    28, 29, 30
  ];

  const weekDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "НД"];

  return (
    <div className="max-w-xs mx-auto my-10 font-serif text-[#9e8a84]">
      <h3 className="text-center uppercase tracking-[0.2em] text-2xl mb-6 text-[#eeb9b9]">
        Вересень 2026
      </h3>
      
      <div className="grid grid-cols-7 gap-y-3 text-center items-center">
        {weekDays.map((day) => (
          <span key={day} className="text-[10px] tracking-widest font-sans opacity-70 mb-2">
            {day}
          </span>
        ))}
        
        {days.map((day, index) => (
          <div key={index} className="relative h-10 flex items-center justify-center text-lg">
            {day === 5 ? (
              <div className="relative z-10 flex items-center justify-center w-full h-full">
                <svg
                  className="absolute w-11 h-11 text-[#f7d7d7]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="relative z-20 text-[#9e8a84] font-medium">{day}</span>
              </div>
            ) : (
              <span className={day ? "opacity-80" : "invisible"}>{day}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

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
    <section className="wedding-section bg-[#fffcf9] text-center py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 
          className={TEXT_STYLE}
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Щиро запрошуємо вас на свято, присвячене створенню нашої сім'ї, яке відбудеться:
        </h2>

        <WeddingCalendar />

        <p 
          className={TEXT_STYLE + " mt-16"} 
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          До нашого свята залишилось:
        </p>
        
        <div className="flex justify-center gap-8 md:gap-14">
          {items.map((item) => (
            <div key={item.label} className="text-center">
              <span className="block font-display text-4xl md:text-5xl text-[#6b5e5a] font-light">
                {item.value}
              </span>
              <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#9e8a84] mt-3">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CountdownSection;
