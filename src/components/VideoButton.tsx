import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import weddingPoster from "@/assets/wedding-poster.jpg.asset.json";

interface VideoButtonProps {
  variant?: "floating" | "inline";
}

const VideoButton = ({ variant = "floating" }: VideoButtonProps) => {
  const videoSrc = "https://raw.githubusercontent.com/Nicky753951/mvsytnyk/main/public/wedding-video.mp4";
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const isInline = variant === "inline";

  useEffect(() => {
    if (isInline) {
      setVisible(true);
      return;
    }

    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      const atBottom = (window.innerHeight + y) >= (document.documentElement.scrollHeight - 80);
      const scrollingUp = y < lastY;
      setVisible(y > 600 && (!atBottom || scrollingUp));
      lastY = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isInline]);

  return (
    <>
      <AnimatePresence>
        {(!isOpen && (isInline || visible)) && (
          <motion.button
            initial={{ opacity: 0, scale: isInline ? 0.96 : 0.6, y: isInline ? 8 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: isInline ? 0.96 : 0.6, y: isInline ? 8 : 20 }}
            transition={{ type: "spring", damping: 18, stiffness: 220 }}
            onClick={() => setIsOpen(true)}
            aria-label="Відкрити відео-запрошення"
            className={isInline
              ? "group inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/85 px-5 py-3 text-sm font-semibold text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.15)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
              : "group fixed bottom-24 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full overflow-hidden shadow-[0_8px_24px_-6px_hsl(var(--primary)/0.5)] hover:shadow-[0_12px_32px_-6px_hsl(var(--primary)/0.65)] transition-shadow"
            }
            style={isInline ? undefined : {
              background:
                "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
            }}
          >
            {isInline ? (
              <>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-sm">
                  <Play className="h-4 w-4 fill-current" />
                </span>
                <span>Дивитись відео</span>
              </>
            ) : (
              <>
                {/* Decorative pulse rings */}
                <span className="absolute inset-0 rounded-full ring-1 ring-white/30" />
                <span className="absolute inset-0 rounded-full bg-white/10 animate-ping" style={{ animationDuration: "2.6s" }} />
                <span className="absolute -inset-1 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Shine sweep on hover */}
                <span className="pointer-events-none absolute inset-0 rounded-full overflow-hidden">
                  <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 translate-x-0 group-hover:translate-x-[300%] transition-transform duration-700 ease-out" />
                </span>

                <Play className="relative w-5 h-5 text-primary-foreground fill-current translate-x-[1px] drop-shadow-sm" />

                {/* Floating label tooltip */}
                <span className="pointer-events-none absolute right-full mr-3 px-3 py-1.5 rounded-full bg-foreground/90 text-background text-xs font-display whitespace-nowrap opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-lg">
                  Відео-запрошення
                </span>
              </>
            )}
          </motion.button>
        )}
      </AnimatePresence>


      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-none w-auto p-0 bg-transparent border-0 shadow-none [&>button]:hidden">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative flex flex-col items-center"
              >
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute -top-12 right-0 z-50 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5 text-foreground" />
                </motion.button>

                <div
                  className="relative rounded-2xl overflow-hidden shadow-2xl bg-black"
                  style={{ maxHeight: "80vh", aspectRatio: "9/16" }}
                >
                  {!videoLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black z-10 pointer-events-none">
                      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                  <video
                    key={isOpen ? "open" : "closed"}
                    src={videoSrc}
                    poster={weddingPoster.url}
                    controls
                    autoPlay
                    playsInline
                    preload="auto"
                    onLoadedMetadata={() => setVideoLoaded(true)}
                    onCanPlay={() => setVideoLoaded(true)}
                    onError={() => setVideoLoaded(true)}
                    className="max-h-[80vh] w-auto h-auto object-contain"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoButton;
