import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Card {
  text: string;
  answer: "koля" | "віка";
}

const allCards: Card[] = [
  { text: "Має улюблену чашку і п'є каву тільки з неї", answer: "koля" },
  { text: "Прикрасив свій робочий стіл квіткою і свічкою", answer: "віка" },
  { text: "Довго вибирає що подивитись і врешті вмикає вже переглянуте", answer: "koля" },
  { text: "Забув відповісти на повідомлення і згадав через два дні", answer: "віка" },
  { text: "Їсть одне й те саме на сніданок роками і задоволений", answer: "koля" },
  { text: "Купив річ яка «може колись знадобиться»", answer: "віка" },
  { text: "Не памʼятає коли востаннє дивився телевізор", answer: "koля" },
  { text: "Плакала від відео з котиками", answer: "віка" },
  { text: "Забув, навіщо зайшов у кімнату", answer: "koля" },
  { text: "Може довго вибирати, а потім взяти перше, що сподобалось", answer: "віка" },
  { text: "Вимкнув сповіщення на телефоні і почувається добре", answer: "koля" },
  { text: "Підбирає одяг під настрій а не під погоду", answer: "віка" },
  { text: "Поставив будильник на 6:00, прокинувся о 9:00", answer: "koля" },
  { text: "Знає напам'ять день народження кожної подруги", answer: "віка" },
  { text: "Сказав «п'ять хвилин» і грав у PlayStation дві години", answer: "koля" },
  { text: "Помітив що в кафе поміняли музику і стало гірше", answer: "віка" },
  { text: "Випив молоко прямо з пакета", answer: "koля" },
  { text: "Дивиться фільм до кінця навіть якщо не цікаво", answer: "віка" },
  { text: "Не обговорює плани поки не впевнений що все вийде", answer: "koля" },
  { text: "Надіслав другу мем о першій ночі бо «це точно про тебе»", answer: "віка" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const WhoDidItGame = ({ open, onClose }: Props) => {
  const [cards, setCards] = useState<Card[]>(() => shuffle(allCards));
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [direction, setDirection] = useState(1);

  const total = cards.length;
  const progress = finished ? 100 : (current / total) * 100;

  const handleAnswer = useCallback(
    (answer: "koля" | "віка") => {
      if (revealed) return;
      const correct = cards[current].answer === answer;
      if (correct) setScore((s) => s + 1);
      setRevealed(cards[current].answer);

      setTimeout(() => {
        if (current + 1 >= total) {
          setFinished(true);
        } else {
          setDirection(1);
          setCurrent((c) => c + 1);
        }
        setRevealed(null);
      }, 1200);
    },
    [revealed, cards, current, total]
  );

  const restart = useCallback(() => {
    setCards(shuffle(allCards));
    setCurrent(0);
    setScore(0);
    setRevealed(null);
    setFinished(false);
    setDirection(1);
  }, []);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Progress bar */}
          <div className="h-1.5 bg-muted">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="p-6 md:p-8">
            {/* Header */}
            <h3 className="font-display text-xl md:text-2xl text-foreground text-center mb-1">
              Гра "Хто з наречених"?
            </h3>
            <p className="text-center text-muted-foreground text-sm mb-6">
              Коля чи Віка? 🤔
            </p>

            {finished ? (
              /* Final screen */
              <motion.div
                className="text-center py-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <PartyPopper className="w-12 h-12 text-accent mx-auto mb-4" strokeWidth={1.2} />
                <p className="font-display text-3xl text-foreground mb-2">
                  {score} / {total}
                </p>
                <p className="text-muted-foreground mb-1">
                  {score >= 16
                    ? "Ви знаєте їх краще за них самих! 🏆"
                    : score >= 10
                    ? "Непогано! Ви уважний гість! 👏"
                    : "Є куди рости — дізнавайтесь більше! 😄"}
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Правильних відповідей
                </p>
                <Button
                  onClick={restart}
                  className="bg-accent hover:bg-accent/90 text-white gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Грати знову
                </Button>
              </motion.div>
            ) : (
              /* Card */
              <>
                <div className="relative min-h-[140px] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current}
                      className="w-full rounded-xl border border-border bg-background p-6 text-center"
                      initial={{ opacity: 0, x: direction * 60 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -60 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-xs text-muted-foreground mb-3 uppercase tracking-widest">
                        {current + 1} / {total}
                      </p>
                      <p className="font-display text-lg md:text-xl text-foreground leading-snug">
                        {cards[current].text}
                      </p>

                      {revealed && (
                        <motion.p
                          className="mt-4 text-sm font-medium text-accent"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          Це був{revealed === "віка" ? "а" : ""}{" "}
                          {revealed === "koля" ? "Коля 👦" : "Віка 👧"}!
                        </motion.p>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Answer buttons */}
                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    className={`flex-1 h-14 text-base font-display gap-2 transition-all ${
                      revealed === "koля"
                        ? "border-accent bg-accent/10 text-accent"
                        : revealed === "віка"
                        ? "opacity-50"
                        : "hover:border-accent"
                    }`}
                    onClick={() => handleAnswer("koля")}
                    disabled={!!revealed}
                  >
                    👦 Коля
                  </Button>
                  <Button
                    variant="outline"
                    className={`flex-1 h-14 text-base font-display gap-2 transition-all ${
                      revealed === "віка"
                        ? "border-accent bg-accent/10 text-accent"
                        : revealed === "koля"
                        ? "opacity-50"
                        : "hover:border-accent"
                    }`}
                    onClick={() => handleAnswer("віка")}
                    disabled={!!revealed}
                  >
                    👧 Віка
                  </Button>
                </div>

                {/* Score */}
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Рахунок: {score} правильних
                </p>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WhoDidItGame;
