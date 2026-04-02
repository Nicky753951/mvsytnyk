import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2 } from "lucide-react";
import WhoDidItGame from "./WhoDidItGame";

const GameButton = () => {
  const [visible, setVisible] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {visible && !gameOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={() => setGameOpen(true)}
            className="fixed bottom-6 right-20 z-40 flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all font-display text-sm"
          >
            <Gamepad2 className="w-5 h-5" />
            Зіграй у гру
          </motion.button>
        )}
      </AnimatePresence>

      <WhoDidItGame open={gameOpen} onClose={() => setGameOpen(false)} />
    </>
  );
};

export default GameButton;
