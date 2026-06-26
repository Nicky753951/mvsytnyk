import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play, X } from "lucide-react";
import weddingPoster from "@/assets/wedding-poster.jpg.asset.json";
import SectionFlourish from "./SectionFlourish";

const VideoSection = () => {
  const videoSrc = "/wedding-video.mp4";
  const [isOpen, setIsOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <>
      <section className="relative py-20 md:py-28 px-6">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            <SectionFlourish className="mx-auto mb-6" />

            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              Наше запрошення
            </h2>
            <p className="font-body text-muted-foreground text-sm md:text-base mb-10 max-w-xs mx-auto leading-relaxed">
              Натисніть Play, щоб переглянути особисте відео-запрошення
            </p>
          </motion.div>

          {/* Poster with play button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative mx-auto cursor-pointer group"
            onClick={() => setIsOpen(true)}
            style={{ maxWidth: 340 }}
          >
            {/* Phone frame effect */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-muted/40 bg-muted">
              {/* Poster image */}
              <img
                src={weddingPoster.url}
                alt="Відео-запрошення"
                className="w-full aspect-[9/16] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-500" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Pulse rings */}
                  <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" style={{ animationDuration: "2.5s" }} />
                  <span className="absolute -inset-3 rounded-full bg-white/10 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />

                  {/* Button */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                  >
                    <Play className="w-7 h-7 md:w-8 md:h-8 text-foreground fill-foreground ml-1" />
                  </motion.div>
                </div>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white/90 text-xs tracking-[0.2em] uppercase font-medium">
                  Дивитись відео
                </p>
              </div>
            </div>

            {/* Decorative shadow */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[85%] h-6 bg-black/10 blur-xl rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
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
                {/* Close button */}
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute -top-12 right-0 z-50 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5 text-foreground" />
                </motion.button>

                {/* Video container */}
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
                    src={videoSrc}
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

export default VideoSection;
