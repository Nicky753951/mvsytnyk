import { motion } from "framer-motion";

interface Props {
  className?: string;
}

const SectionFlourish = ({ className = "" }: Props) => {
  return (
    <div className={`flex justify-center my-6 ${className}`}>
      <motion.svg
        width="180"
        height="24"
        viewBox="0 0 180 24"
        fill="none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4 }}
        className="text-accent"
      >
        <motion.path
          d="M2 12 Q 30 4, 60 12 T 90 12"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        <motion.path
          d="M178 12 Q 150 20, 120 12 T 90 12"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        <motion.circle
          cx="90"
          cy="12"
          r="2.5"
          fill="currentColor"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: 1.2 }}
        />
      </motion.svg>
    </div>
  );
};

export default SectionFlourish;
