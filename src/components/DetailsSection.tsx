import { motion } from "framer-motion";
import { PartyPopper, MapPin, Clock } from "lucide-react";

const details = [
  {
    icon: PartyPopper,
    title: "Виїзна церемонія і Банкет",
    time: "14:00",
    place: "Ресторан «Софіївський посад»",
    address: "Київська область, с. Софіївська Борщагівка, вул. Київська, 81/2",
  },
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
        <h2 className="wedding-heading text-foreground mb-4">Коли та де</h2>
        <div className="gold-divider" />
      </motion.div>

      <div className="max-w-xl mx-auto mt-16">
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
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
              <Clock className="w-4 h-4" />
              <span className="font-sans text-sm">{d.time}</span>
            </div>
            <p className="wedding-body text-foreground font-medium">{d.place}</p>
            <div className="flex items-center justify-center gap-2 text-muted-foreground mt-2">
              <MapPin className="w-4 h-4" />
              <span className="font-body text-base">{d.address}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DetailsSection;
