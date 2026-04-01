import { Heart } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="py-12 text-center bg-foreground">
      <Heart className="w-5 h-5 text-accent mx-auto mb-4" strokeWidth={1.2} />
      <p className="font-display text-2xl text-primary-foreground mb-2">Микола & Вікторія</p>
      <p className="font-sans text-xs tracking-widest uppercase text-primary-foreground/60">
        5 вересня 2026 · Ресторан « Софіївський посад »
      </p>
    </footer>
  );
};

export default FooterSection;
