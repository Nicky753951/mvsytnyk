import SectionFlourish from "./SectionFlourish";
import { motion } from "framer-motion";
import { Clock, ParkingCircle, ExternalLink } from "lucide-react";
import bzImg from "../assets/bz.webp";
import floralTop from "@/assets/floral-top.png";
import floralBottom from "@/assets/floral-bottom.png";
import WeatherWidget from "./WeatherWidget";

const MAPS_LINK = "https://www.google.com/maps?q=%D0%A1%D0%BE%D1%84%D1%96%D1%97%D0%B2%D1%81%D1%8C%D0%BA%D0%B8%D0%B9+%D0%9F%D0%BE%D1%81%D0%B0%D0%B4,+%D0%B2%D1%83%D0%BB%D0%B8%D1%86%D1%8F+%D0%9A%D0%B8%D1%97%D0%B2%D1%81%D1%8C%D0%BA%D0%B0,+81/2,+%D0%A1%D0%BE%D1%84%D1%96%D1%97%D0%B2%D1%81%D1%8C%D0%BA%D0%B0+%D0%91%D0%BE%D1%80%D1%89%D0%B0%D0%B3%D1%96%D0%B2%D0%BA%D0%B0,+%D0%9A%D0%B8%D1%97%D0%B2%D1%81%D1%8C%D0%BA%D0%B0+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+08131&ftid=0x40d4cbc6c11f7db9:0x87205c1af3bbb4d";

const program = [
  { time: "13:00", title: "Зустріч гостей", text: "Починаємо цей день з теплих обіймів, щирих усмішок і келиху ігристого" },
  { time: "14:00", title: "Церемонія", text: "Візьміть серветки для сліз щастя, попереду дуже чуттєвий момент" },
  { time: "15:00", title: "Святковий банкет", text: "Час смачної їжі, зворушливих тостів і затишної атмосфери" },
  { time: "21:00", title: "Сімейне вогнище", text: "Час запалити вогонь нашої нової родини та зігрітися теплом найрідніших сердець" },
  { time: "22:30", title: "Завершення вечора", text: "Дякуємо, що розділили цей незабутній день разом з нами!" },
];

const DetailsSection = () => {

  return (
    <section className="relative wedding-section bg-card text-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, hsl(40 30% 95%) 0%, hsl(350 25% 94%) 40%, hsl(38 28% 95%) 70%, hsl(40 30% 95%) 100%)" }}
    >
      {/* Soft background orbs */}
      {[
        { w: 340, h: 300, left: "-8%",  top: "-10%", color: "hsl(350 30% 85% / 0.28)", blur: 80, dur: 10, delay: 0 },
        { w: 220, h: 220, left: "78%",  top: "5%",   color: "hsl(38 60% 65% / 0.12)",  blur: 60, dur: 13, delay: 2 },
        { w: 200, h: 200, left: "10%",  top: "55%",  color: "hsl(350 30% 85% / 0.18)", blur: 55, dur: 11, delay: 1 },
        { w: 160, h: 180, left: "68%",  top: "60%",  color: "hsl(38 60% 65% / 0.09)",  blur: 45, dur: 9,  delay: 3 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none rounded-full"
          style={{ width: orb.w, height: orb.h, left: orb.left, top: orb.top, background: orb.color, filter: `blur(${orb.blur}px)` }}
          animate={{ scale: [1, 1.12, 0.94, 1], x: [0, 14, -8, 0], y: [0, -10, 6, 0] }}
          transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Floral decorations */}
      <img src={floralTop}    aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-56 md:w-80 opacity-20 pointer-events-none select-none" />
      <img src={floralBottom} aria-hidden className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 md:w-80 opacity-15 pointer-events-none select-none" />

      <div className="relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="wedding-subheading text-muted-foreground mb-2">Де & коли</p>
        <h2 className="wedding-heading text-foreground mb-4">Головні координати дня</h2>
        <SectionFlourish />
      </motion.div>

      {/* Location card */}
      <motion.div
        className="max-w-4xl mx-auto mt-10 grid md:grid-cols-2 gap-4 text-left"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Image */}
        <div className="rounded-2xl overflow-hidden bg-muted min-h-[280px] md:min-h-0">
          <img
            src={bzImg}
            alt="Софіївський Посад"
            className="w-full h-full object-cover"
            style={{ minHeight: "280px" }}
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-3">
          {/* Venue name */}
          <div className="rounded-2xl border border-border bg-background p-5">
            <p className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground mb-2">
              Місце проведення
            </p>
            <h3 className="font-display text-xl text-foreground mb-1">Ресторан «Софіївський Посад»</h3>
            <p className="font-display text-sm text-accent mb-3">Банкетний зал «Версаль»</p>
            <p className="font-display text-sm text-muted-foreground">вул. Київська, 81/2</p>
            <p className="font-display text-sm text-muted-foreground">Софіївська Борщагівка, Київська обл.</p>
          </div>

          {/* Parking */}
          <div className="rounded-2xl border border-border bg-background px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <ParkingCircle className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground">Паркінг</p>
                <p className="font-display text-sm text-muted-foreground">Безкоштовний</p>
              </div>
            </div>
          </div>

          {/* Route button */}
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-4 rounded-2xl font-display text-sm tracking-[0.15em] transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/85 hover:shadow-lg"
          >
            Прокласти маршрут
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </motion.div>

      {/* Програма свята */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Clock className="w-10 h-10 text-accent mx-auto mb-6" strokeWidth={1.2} />
        <h3 className="font-display text-2xl text-foreground mb-2">Програма</h3>
      </motion.div>

      <div className="max-w-md mx-auto mt-10 relative">
        {/* Вертикальна лінія */}
        <div className="absolute left-[28px] md:left-[32px] top-4 bottom-4 w-px bg-border" />

        {program.map((item, i) => (
          <motion.div
            key={i}
            className="relative flex items-start gap-5 mb-10 last:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            {/* Кружок з часом */}
            <div className="relative z-10 flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full border border-accent/40 bg-card flex items-center justify-center">
              <span className="font-display text-sm md:text-base text-accent">{item.time}</span>
            </div>

            {/* Текст */}
            <div className="text-left pt-1">
              <h4 className="font-display text-lg md:text-xl text-foreground mb-1">{item.title}</h4>
              <p className="wedding-body text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default DetailsSection;
