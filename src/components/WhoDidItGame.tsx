import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, PartyPopper, Play, Pause, ChevronRight, Gamepad2 } from "lucide-react";
import victoriaUrl from "@/assets/Nick Sytnyk - Вікторія.mp3";

const SONG_CARD_TEXT = "Написав пісню про другу половинку";

interface Card {
  text: string;
  answer: "koля" | "віка";
}

const allCards: Card[] = [
  { text: "Написав пісню про другу половинку", answer: "koля" },
  { text: "Хоче завести французького бульдога", answer: "віка" },
  { text: "Вважає чорну діру гігантським комп'ютером", answer: "koля" },
  { text: "Забуває відповісти на повідомлення і згадує через два дні", answer: "віка" },
  { text: "Їсть одне й те саме на сніданок роками і задоволений", answer: "koля" },
  { text: "Знає, як заспокоїти другу половинку одним поглядом або словом", answer: "віка" },
  { text: "Не памʼятає коли востаннє дивився телевізор", answer: "koля" },
  { text: "Плаче від відео з котиками", answer: "віка" },
  { text: "Обожнює колекціонувати годинники Casio", answer: "koля" },
  { text: "Може довго вибирати, а потім взяти перше, що сподобалось", answer: "віка" },
  { text: "Вимикає сповіщення на телефоні і почувається добре", answer: "koля" },
  { text: "Підбирає одяг під настрій, а не під погоду", answer: "віка" },
  { text: "Ставить будильник на 6:00, прокидається о 9:00", answer: "koля" },
  { text: "Любить українські серіали", answer: "віка" },
  { text: "Каже «п'ять хвилин» і грає у PlayStation дві години", answer: "koля" },
  { text: "Знає всі TikTok тренди", answer: "віка" },
  { text: "Може зібратись і вийти з дому за пʼять хвилин", answer: "koля" },
  { text: "Дивиться фільм до кінця навіть якщо не цікаво", answer: "віка" },
  { text: "Не обговорює плани поки не впевнений, що все вийде", answer: "koля" },
  { text: "Заряджає телефон тільки коли вже 5%", answer: "віка" },
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
  const [showSongPlayer, setShowSongPlayer] = useState(false);
  const [songPlaying, setSongPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const total = cards.length;
  const progress = finished ? 100 : (current / total) * 100;

  const stopSong = useCallback(() => {
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
    setSongPlaying(false);
  }, []);

  const toggleSong = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(victoriaUrl);
      audioRef.current.onended = () => setSongPlaying(false);
    }
    if (songPlaying) {
      audioRef.current.pause();
      setSongPlaying(false);
    } else {
      audioRef.current.play();
      setSongPlaying(true);
    }
  }, [songPlaying]);

  const handleAnswer = useCallback(
    (answer: "koля" | "віка") => {
      if (revealed) return;
      const correct = cards[current].answer === answer;
      if (correct) setScore((s) => s + 1);
      setRevealed(cards[current].answer);

      if (cards[current].text === SONG_CARD_TEXT) {
        setShowSongPlayer(true);
      } else {
        setTimeout(() => {
          if (current + 1 >= total) {
            setFinished(true);
          } else {
            setDirection(1);
            setCurrent((c) => c + 1);
          }
          setRevealed(null);
        }, 1200);
      }
    },
    [revealed, cards, current, total]
  );

  const handleNext = useCallback(() => {
    stopSong();
    setShowSongPlayer(false);
    setRevealed(null);
    if (current + 1 >= total) {
      setFinished(true);
    } else {
      setDirection(1);
      setCurrent((c) => c + 1);
    }
  }, [current, total, stopSong]);

  const restart = useCallback(() => {
    stopSong();
    setShowSongPlayer(false);
    setCards(shuffle(allCards));
    setCurrent(0);
    setScore(0);
    setRevealed(null);
    setFinished(false);
    setDirection(1);
  }, [stopSong]);

  const handleClose = useCallback(() => {
    stopSong();
    onClose();
  }, [onClose, stopSong]);

  if (!open) return null;

  const isSongCard = cards[current].text === SONG_CARD_TEXT;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={handleClose} />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-md max-h-[85vh] bg-background rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-br from-accent/20 to-secondary/30 px-6 pt-6 pb-4">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <Gamepad2 className="w-10 h-10 text-accent mb-3" strokeWidth={1.2} />
            <h3 className="font-display text-2xl text-foreground text-center">Хто з наречених?</h3>
            <p className="font-body text-sm text-muted-foreground mt-1 text-center">
              Вгадайте, хто це — Коля чи Віка? 🤔
            </p>

            {/* Progress indicator */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-background/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <span className="font-sans text-xs text-muted-foreground tracking-wider">
                {finished ? total : current} / {total}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {finished ? (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <PartyPopper className="w-8 h-8 text-accent" strokeWidth={1.2} />
                </div>
                <p className="font-display text-3xl text-foreground mb-1">
                  {score} / {total}
                </p>
                <p className="font-body text-sm text-muted-foreground mb-1">
                  Правильних відповідей
                </p>
                <p className="font-body text-muted-foreground mb-6">
                  {score >= 16
                    ? "Ви знаєте їх краще за них самих! 🏆"
                    : score >= 10
                    ? "Непогано! Ви уважний гість! 👏"
                    : "Є куди рости — дізнавайтесь більше! 😄"}
                </p>
                <button
                  onClick={restart}
                  className="w-full py-3 bg-accent text-accent-foreground font-sans text-xs tracking-[0.2em] uppercase rounded-xl hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Грати знову
                </button>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Question card */}
                  <div className="rounded-xl bg-accent/5 border border-border p-5 mb-5">
                    <p className="font-display text-lg md:text-xl text-foreground leading-snug text-center">
                      {cards[current].text}
                    </p>

                    {revealed && (
                      <motion.div
                        className="mt-4 pt-3 border-t border-border text-center"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent font-sans text-sm">
                          {revealed === "koля" ? "👦 Коля" : "👧 Віка"}
                        </span>
                      </motion.div>
                    )}

                    {/* Song player */}
                    {revealed && showSongPlayer && isSongCard && (
                      <motion.div
                        className="mt-4 pt-3 border-t border-border text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <p className="font-body text-xs text-muted-foreground mb-3">
                          🎵 Коля написав для Віки пісню
                        </p>
                        <button
                          onClick={toggleSong}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-sans tracking-wide hover:bg-accent/90 transition-colors"
                        >
                          {songPlaying ? (
                            <><Pause className="w-4 h-4" /> Пауза</>
                          ) : (
                            <><Play className="w-4 h-4 translate-x-px" /> Послухати «Вікторія»</>
                          )}
                        </button>
                      </motion.div>
                    )}
                  </div>

                  {/* Answer buttons */}
                  <div className="flex gap-3">
                    <button
                      className={`flex-1 py-3.5 rounded-xl border font-sans text-sm tracking-wide transition-all ${
                        revealed === "koля"
                          ? "border-accent bg-accent/10 text-accent"
                          : revealed === "віка"
                          ? "border-border bg-background text-muted-foreground opacity-50"
                          : "border-border bg-background text-foreground hover:bg-accent/5 hover:border-accent/30"
                      }`}
                      onClick={(e) => { (e.currentTarget as HTMLButtonElement).blur(); handleAnswer("koля"); }}
                      disabled={!!revealed}
                    >
                      👦 Коля
                    </button>
                    <button
                      className={`flex-1 py-3.5 rounded-xl border font-sans text-sm tracking-wide transition-all ${
                        revealed === "віка"
                          ? "border-accent bg-accent/10 text-accent"
                          : revealed === "koля"
                          ? "border-border bg-background text-muted-foreground opacity-50"
                          : "border-border bg-background text-foreground hover:bg-accent/5 hover:border-accent/30"
                      }`}
                      onClick={(e) => { (e.currentTarget as HTMLButtonElement).blur(); handleAnswer("віка"); }}
                      disabled={!!revealed}
                    >
                      👧 Віка
                    </button>
                  </div>

                  {/* Next button for song card */}
                  {showSongPlayer && isSongCard && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-3"
                    >
                      <button
                        onClick={handleNext}
                        className="w-full py-2.5 text-muted-foreground hover:text-foreground font-sans text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1"
                      >
                        Далі <ChevronRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}

                  {/* Score */}
                  <p className="text-center font-body text-sm text-muted-foreground mt-4">
                    Рахунок: {score} правильних
                  </p>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WhoDidItGame;
