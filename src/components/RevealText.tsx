import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  once?: boolean;
}

const RevealText = ({
  text,
  className = "",
  delay = 0,
  stagger = 0.04,
  as = "span",
  once = true,
}: Props) => {
  const Tag = motion[as] as typeof motion.span;
  const words = text.split(" ");

  return (
    <Tag
      className={className}
      initial="hidden"
      animate={once ? undefined : "visible"}
      whileInView={once ? "visible" : undefined}
      viewport={once ? { once: true, amount: 0.4 } : undefined}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => (
            <motion.span
              key={ci}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: "0.5em", rotateX: -40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] },
                },
              }}
            >
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
};

export default RevealText;
