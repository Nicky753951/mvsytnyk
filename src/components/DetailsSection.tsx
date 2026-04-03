import { motion } from "framer-motion";
import { PartyPopper, MapPin, Clock } from "lucide-react";

const details = [
  {
    icon: PartyPopper,
    title: "Локація",
    place: "Ресторан «Софіївський посад»",
    link: "https://www.google.com/maps?q=%D0%A1%D0%BE%D1%84%D1%96%D1%97%D0%B2%D1%81%D1%8C%D0%BA%D0%B8%D0%B9+%D0%9F%D0%BE%D1%81%D0%B0%D0%B4,+%D0%B2%D1%83%D0%BB%D0%B8%D1%86%D1%8F+%D0%9A%D0%B8%D1%97%D0%B2%D1%81%D1%8C%D0%BA%D0%B0,+81/2,+%D0%A1%D0%BE%D1%84%D1%96%D1%97%D0%B2%D1%81%D1%8C%D0%BA%D0%B0+%D0%91%D0%BE%D1%80%D1%89%D0%B0%D0%B3%D1%96%D0%B2%D0%BA%D0%B0,+%D0%9A%D0%B8%D1%97%D0%B2%D1%81%D1%8C%D0%BA%D0%B0+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+08131&ftid=0x40d4cbc6c11f7db9:0x87205c1af3bbb4d&entry=gps&shh=CAE&lucs=,94297699,94284493,94231188,94280568,47071704,94218641,94282134,100799872,94286869&g_ep=CAISEjI2LjEyLjIuODg0NjExMjE2MBgAIIgnKlIsOTQyOTc2OTksOTQyODQ0OTMsOTQyMzExODgsOTQyODA1NjgsNDcwNzE3MDQsOTQyMTg2NDEsOTQyODIxMzQsMTAwNzk5ODcyLDk0Mjg2ODY5QgJVQQ%3D%3D&skid=56b301d8-9a91-47a2-a09a-389e4eeca823&g_st=it&g_st=it",
    address: "Київська область, с. Софіївська Борщагівка, вул. Київська, 81/2",
  },
];

const program = [
  { time: "14:00", title: "Зустріч гостей", text: "Починаємо цей день з теплих обіймів, щирих усмішок і келиху ігристого" },
  { time: "15:00", title: "Церемонія", text: "Візьміть серветки для сліз щастя, попереду дуже чуттєвий момент" },
  { time: "16:00", title: "Святковий банкет", text: "Час смачної їжі, зворушливих тостів і затишної атмосфери" },
  { time: "21:00", title: "Торт", text: "Аромат кави та солодкий десерт – приємна мить цього вечора" },
];

const DetailsSection = () => {
  return (
    <section className="wedding-section bg-card text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="wedding-subheading text-muted-foreground mb-2">Деталі свята</p>
        <h2 className="wedding-heading text-foreground mb-4">Головні координати дня</h2>
        <div className="gold-divider" />
      </motion.div>

      <div className="max-w-xl mx-auto mt-8">
        {details.map((d, i) => (
          <motion.div
            key={i}
            className="text-center p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <d.icon className="w-10 h-10 text-accent mx-auto mb-6" strokeWidth={1.2} />
            <h3 className="font-display text-2xl text-foreground mb-4">{d.title}</h3>
            <a
              href={d.link}
              target="_blank"
              rel="noopener noreferrer"
              className="wedding-body text-foreground font-medium underline decoration-accent underline-offset-4 hover:text-accent transition-colors"
            >
              {d.place}
            </a>
            <div className="flex items-center justify-center gap-2 text-muted-foreground mt-2">
              <MapPin className="w-4 h-4" />
              <span className="font-body text-base">{d.address}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Програма свята */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Clock className="w-10 h-10 text-accent mx-auto mb-6" strokeWidth={1.2} />
        <h3 className="font-display text-2xl text-foreground mb-2">Програма дня</h3>
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
    </section>
  );
};

export default DetailsSection;
