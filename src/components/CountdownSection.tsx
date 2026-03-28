import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const WEDDING_DATE = new Date("2026-09-05T14:00:00");

const WeddingCalendar = () => {
  // Генерація днів для вересня 2026 (починається з вівторка - 01.09.2026)
  // Пн Вт Ср Чт Пт Сб Нд
  //     1  2  3  4  5  6
  const days = [
    null, 1, 2, 3, 4, 5, 6, 
    7, 8, 9, 10, 11, 12, 13, 
    14, 15, 16, 17, 18, 19, 20, 
    21, 22, 23, 24, 25, 26, 27, 
    28, 29, 30
  ];

  const weekDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "НД"];

  return (
    <div className="max-w-xs mx-auto my-12 font-serif text-[#8a8a8a]">
      <h3 className="text-center uppercase tracking-widest text-xl mb-8 text-[#a5b4fc]">
        Вересень 2026
      </h3>
      
      <div className="grid grid-cols-7 gap-y-4 text-center items-center">
        {weekDays.map((day) => (
          <span key={day} className="text-xs font-sans font-semibold mb-2">
            {day}
          </span>
        ))}
        
        {days.map((day, index) => (
          <div key={index} className="relative h-10 flex items-center justify-center text-lg">
            {day === 5 ? (
              <div className="relative z-10 flex items-center justify-center w-full h-full">
                {/* SVG Сердечко */}
                <svg
                  className="absolute w-12 h-12 text-[#a5b4fc] opacity-80"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="relative z-20 text-white font-bold">{day}</span>
              </div>
            ) : (
              <span className={day ? "" : "invisible"}>{day}</span>
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
    <section className="wedding-section bg-card text-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl md:text-3xl font-serif mb-6 max-w-2xl mx-auto leading-relaxed text-foreground">
          Щиро запрошуємо вас на свято, присвячене створенню нашої сім'ї, яке відбудеться:
        </h2>

        <WeddingCalendar />

        <p className="wedding-subheading text-muted-foreground mb-6 mt-12">
          До нашого свята залишилось:
        </p>
        
        <div className="flex justify-center gap-6 md:gap-12">
          {items.map((item) => (
            <div key={item.label} className="text-center">
              <span className="font-display text-4xl md:text-6xl text-foreground">
                {item.value}
              </span>
              <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mt-2">
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
