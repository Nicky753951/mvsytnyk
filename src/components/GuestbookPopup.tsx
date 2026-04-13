import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Send, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Wish {
  id: string;
  author_name: string;
  message: string;
  created_at: string;
}

interface GuestbookPopupProps {
  open: boolean;
  onClose: () => void;
}

const GuestbookPopup = ({ open, onClose }: GuestbookPopupProps) => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [tab, setTab] = useState<"read" | "write">("read");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [saved, setSaved] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const wishesPerPage = 3;

  const fetchWishes = async () => {
    const { data } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setWishes(data);
  };

  useEffect(() => {
    if (open) fetchWishes();
  }, [open]);

  useEffect(() => {
    if (!open) {
      setSaved(false);
      setName("");
      setMessage("");
      setTab("read");
      setCurrentPage(0);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSending(true);
    const { error } = await supabase
      .from("guestbook")
      .insert({ author_name: name.trim(), message: message.trim() });
    setSending(false);
    if (error) {
      toast.error("Щось пішло не так, спробуйте ще раз");
      return;
    }
    setSaved(true);
    fetchWishes();
    setTimeout(() => {
      setSaved(false);
      setName("");
      setMessage("");
      setTab("read");
    }, 2500);
  };

  const totalPages = Math.max(1, Math.ceil(wishes.length / wishesPerPage));
  const displayedWishes = wishes.slice(
    currentPage * wishesPerPage,
    (currentPage + 1) * wishesPerPage
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={onClose} />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md max-h-[85vh] bg-background rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-accent/20 to-secondary/30 px-6 pt-6 pb-4">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <BookOpen className="w-10 h-10 text-accent mb-3" strokeWidth={1.2} />
              <h3 className="font-display text-2xl text-foreground">Книга побажань</h3>
              <p className="font-body text-sm text-muted-foreground mt-1">
                Залиште своє побажання молодятам
              </p>

              {/* Tabs */}
              <div className="flex mt-4 bg-background/50 rounded-full p-1">
                <button
                  onClick={() => { setTab("read"); setCurrentPage(0); }}
                  className={`flex-1 py-2 text-xs font-sans tracking-wider uppercase rounded-full transition-all ${
                    tab === "read"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  Побажання
                </button>
                <button
                  onClick={() => setTab("write")}
                  className={`flex-1 py-2 text-xs font-sans tracking-wider uppercase rounded-full transition-all ${
                    tab === "write"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  Написати
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                {tab === "write" ? (
                  <motion.div
                    key="write"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    {saved ? (
                      <motion.div
                        className="text-center py-10"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                      >
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                          <Check className="w-8 h-8 text-primary" />
                        </div>
                        <p className="font-display text-xl text-foreground mb-1">Дякуємо!</p>
                        <p className="font-body text-muted-foreground">
                          Ваше побажання збережено 💕
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block font-sans text-xs tracking-wider uppercase text-muted-foreground mb-2">
                            Ваше ім'я
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={100}
                            placeholder="Введіть ваше ім'я"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-border bg-background rounded-xl px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent"
                          />
                        </div>
                        <div>
                          <label className="block font-sans text-xs tracking-wider uppercase text-muted-foreground mb-2">
                            Побажання
                          </label>
                          <textarea
                            required
                            maxLength={500}
                            placeholder="Ваше побажання молодятам..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={4}
                            className="w-full border border-border bg-background rounded-xl px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent resize-none"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={sending || !name.trim() || !message.trim()}
                          className="w-full py-3 bg-accent text-accent-foreground font-sans text-xs tracking-[0.2em] uppercase rounded-xl hover:bg-accent/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          {sending ? "Надсилаємо..." : "Надіслати"}
                        </button>
                      </form>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="read"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {wishes.length === 0 ? (
                      <div className="text-center py-10">
                        <BookOpen className="w-10 h-10 text-accent/40 mx-auto mb-3" />
                        <p className="font-body text-muted-foreground">
                          Поки що побажань немає. Будьте першими! 💫
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-3 min-h-[200px]">
                          {displayedWishes.map((wish, i) => (
                            <motion.div
                              key={wish.id}
                              className="p-4 rounded-xl bg-card"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              <p className="font-body text-base text-foreground italic leading-relaxed">
                                "{wish.message}"
                              </p>
                              <p className="font-display text-sm text-accent mt-2">
                                — {wish.author_name}
                              </p>
                            </motion.div>
                          ))}
                        </div>

                        {totalPages > 1 && (
                          <div className="flex items-center justify-center gap-4 mt-4 pt-2">
                            <button
                              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                              disabled={currentPage === 0}
                              className="w-8 h-8 rounded-full bg-accent/10 hover:bg-accent/20 flex items-center justify-center text-accent disabled:opacity-30 transition-colors"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="text-xs text-muted-foreground font-sans">
                              {currentPage + 1} / {totalPages}
                            </span>
                            <button
                              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                              disabled={currentPage === totalPages - 1}
                              className="w-8 h-8 rounded-full bg-accent/10 hover:bg-accent/20 flex items-center justify-center text-accent disabled:opacity-30 transition-colors"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GuestbookPopup;
