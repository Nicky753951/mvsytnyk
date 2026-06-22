import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import weddingPoster from "@/assets/wedding-poster.jpg.asset.json";
import weddingVideo from "@/assets/wedding-video.mp4.asset.json";

const VideoButton = () => {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <>
      <AnimatePresence>
        {visible && !isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-20 right-6 z-40 flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all font-display text-sm"
          >
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" style={{ animationDuration: "2.5s" }} />
              <Play className="w-5 h-5 relative fill-current" />
            </div>
            Відео-запрошення
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
                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                  <video
                    src={weddingVideo.url}
                    poster={weddingPoster.url}
                    controls
                    autoPlay
                    playsInline
                    preload="metadata"
                    onLoadedData={() => setVideoLoaded(true)}
                    className="max-h-[80vh] w-auto h-auto object-contain"
                    style={{ display: videoLoaded ? "block" : "none" }}
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
