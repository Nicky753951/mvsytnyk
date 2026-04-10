import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Send, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [page, setPage] = useState<"write" | "read">("read");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
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
    toast.success("Дякуємо за побажання! 💕");
    setName("");
    setMessage("");
    setPage("read");
    fetchWishes();
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
          {/* Backdrop */}
          <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={onClose} />

          {/* Book */}
          <motion.div
            className="relative w-full max-w-lg bg-background rounded-lg shadow-2xl overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
            transition={{ type: "spring", damping: 25 }}
            style={{ perspective: 1000 }}
          >
            {/* Book spine accent */}
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-accent/60" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-10 p-1 rounded-full text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pl-6 pr-6 pt-8 pb-6">
              {/* Header */}
              <div className="text-center mb-6">
                <BookOpen className="w-8 h-8 text-accent mx-auto mb-3" strokeWidth={1.2} />
                <h3 className="font-display text-2xl text-foreground">Книга побажань</h3>
                <div className="w-16 h-px bg-accent mx-auto mt-3 opacity-50" />
              </div>

              {/* Tab switcher */}
              <div className="flex justify-center gap-1 mb-6">
                <button
                  onClick={() => { setPage("read"); setCurrentPage(0); }}
                  className={`px-4 py-2 text-xs tracking-widest uppercase font-sans rounded-sm transition-colors ${
                    page === "read"
                      ? "bg-accent/20 text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Побажання
                </button>
                <button
                  onClick={() => setPage("write")}
                  className={`px-4 py-2 text-xs tracking-widest uppercase font-sans rounded-sm transition-colors ${
                    page === "write"
                      ? "bg-accent/20 text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Написати
                </button>
              </div>

              {/* Content */}
              <AnimatePresence mode="wait">
                {page === "write" ? (
                  <motion.form
                    key="write"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                  >
                    <input
                      type="text"
                      required
                      maxLength={100}
                      placeholder="Ваше ім'я"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border-b border-border bg-transparent py-3 text-center font-body text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    />
                    <textarea
                      required
                      maxLength={500}
                      placeholder="Ваше побажання молодятам..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full border-b border-border bg-transparent py-3 text-center font-body text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                    />
                    <div className="text-center pt-2">
                      <button
                        type="submit"
                        disabled={sending}
                        className="inline-flex items-center gap-2 border border-foreground/30 text-foreground px-8 py-3 font-sans text-xs tracking-[0.3em] uppercase hover:bg-foreground hover:text-background transition-colors duration-300 disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5" />
                        {sending ? "Надсилаємо..." : "Надіслати"}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="read"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.25 }}
                  >
                    {wishes.length === 0 ? (
                      <p className="text-center text-muted-foreground font-body py-8">
                        Поки що побажань немає. Будьте першими! 💫
                      </p>
                    ) : (
                      <>
                        <div className="space-y-4 min-h-[200px]">
                          {displayedWishes.map((wish) => (
                            <div
                              key={wish.id}
                              className="border-b border-border/50 pb-4 last:border-b-0"
                            >
                              <p className="font-body text-base text-foreground italic leading-relaxed">
                                "{wish.message}"
                              </p>
                              <p className="font-display text-sm text-accent mt-2">
                                — {wish.author_name}
                              </p>
                            </div>
                          ))}
                        </div>

                        {totalPages > 1 && (
                          <div className="flex items-center justify-center gap-4 mt-4 pt-2">
                            <button
                              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                              disabled={currentPage === 0}
                              className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="text-xs text-muted-foreground font-sans">
                              {currentPage + 1} / {totalPages}
                            </span>
                            <button
                              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                              disabled={currentPage === totalPages - 1}
                              className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
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
