import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Music, Disc3, Plus, Check, Loader2, Play, Pause } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Song {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  previewUrl?: string;
  collectionName?: string;
}

interface SavedRequest {
  id: string;
  guest_name: string;
  song_title: string;
  artist_name: string;
  artwork_url: string | null;
  preview_url: string | null;
  created_at: string;
}

interface MusicRequestPopupProps {
  open: boolean;
  onClose: () => void;
}

const MusicRequestPopup = ({ open, onClose }: MusicRequestPopupProps) => {
  const [tab, setTab] = useState<"search" | "playlist">("search");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [searching, setSearching] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [playlist, setPlaylist] = useState<SavedRequest[]>([]);
  const [loadingPlaylist, setLoadingPlaylist] = useState(false);
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const searchTimeout = useRef<ReturnType<typeof setTimeout>>();

  const togglePlay = (url: string) => {
    if (playingUrl === url) {
      audioRef.current?.pause();
      setPlayingUrl(null);
    } else {
      if (audioRef.current) audioRef.current.pause();
      const audio = new Audio(url);
      audio.onended = () => setPlayingUrl(null);
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => setPlayingUrl(null));
      }
      audioRef.current = audio;
      setPlayingUrl(url);
    }
  };

  useEffect(() => {
    if (open && tab === "playlist") loadPlaylist();
  }, [open, tab]);

  useEffect(() => {
    if (!open) {
      audioRef.current?.pause();
      audioRef.current = null;
      setPlayingUrl(null);
      setQuery("");
      setResults([]);
      setSelectedSong(null);
      setSaved(false);
      setGuestName("");
    }
  }, [open]);

  const loadPlaylist = async () => {
    setLoadingPlaylist(true);
    const { data } = await supabase
      .from("song_requests")
      .select("*")
      .order("created_at", { ascending: false });
    setPlaylist(data || []);
    setLoadingPlaylist(false);
  };

  const searchSongs = (q: string) => {
    setQuery(q);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (q.trim().length < 2) {
      setResults([]);
      return;
    }
    searchTimeout.current = setTimeout(async () => {
      setSearching(true);
      const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=music&entity=song&limit=8&country=UA`;
      try {
        const res = await fetch(itunesUrl, { mode: "cors" });
        const data = await res.json();
        setResults(data.results || []);
      } catch {
        // Fallback via CORS proxy for iOS Safari
        try {
          const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(itunesUrl)}`);
          const data = await res.json();
          setResults(data.results || []);
        } catch {
          setResults([]);
        }
      }
      setSearching(false);
    }, 400);
  };

  const handleSubmit = async () => {
    if (!selectedSong || !guestName.trim()) return;
    setSaving(true);
    const { error } = await supabase.from("song_requests").insert({
      guest_name: guestName.trim(),
      song_title: selectedSong.trackName,
      artist_name: selectedSong.artistName,
      artwork_url: selectedSong.artworkUrl100?.replace("100x100", "200x200") || null,
      preview_url: selectedSong.previewUrl || null,
    });
    setSaving(false);
    if (!error) {
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setSelectedSong(null);
        setQuery("");
        setResults([]);
        setGuestName("");
      }, 2500);
    }
  };

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
              <Disc3 className="w-10 h-10 text-accent mb-3" strokeWidth={1.2} />
              <h3 className="font-display text-2xl text-foreground">Музичне побажання</h3>
              <p className="font-body text-sm text-muted-foreground mt-1">
                Оберіть пісню, яку ви хочете почути на святі
              </p>

              {/* Tabs */}
              <div className="flex mt-4 bg-background/50 rounded-full p-1">
                <button
                  onClick={() => setTab("search")}
                  className={`flex-1 py-2 text-xs font-sans tracking-wider uppercase rounded-full transition-all ${
                    tab === "search"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  Обрати пісню
                </button>
                <button
                  onClick={() => setTab("playlist")}
                  className={`flex-1 py-2 text-xs font-sans tracking-wider uppercase rounded-full transition-all ${
                    tab === "playlist"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  Плейлист
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                {tab === "search" ? (
                  <motion.div
                    key="search"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
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
                          Вашу пісню додано до плейлисту
                        </p>
                      </motion.div>
                    ) : selectedSong ? (
                      /* Confirm + name */
                      <div>
                        <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-xl mb-5">
                          {selectedSong.artworkUrl100 && (
                            <img
                              src={selectedSong.artworkUrl100}
                              alt=""
                              className="w-14 h-14 rounded-lg object-cover"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-display text-sm text-foreground truncate">
                              {selectedSong.trackName}
                            </p>
                            <p className="font-body text-xs text-muted-foreground truncate">
                              {selectedSong.artistName}
                            </p>
                          </div>
                          <button
                            onClick={() => setSelectedSong(null)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <label className="block font-sans text-xs tracking-wider uppercase text-muted-foreground mb-2">
                          Ваше ім'я
                        </label>
                        <input
                          type="text"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="Введіть ваше ім'я"
                          className="w-full border border-border bg-background rounded-xl px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent mb-5"
                        />

                        <button
                          onClick={handleSubmit}
                          disabled={!guestName.trim() || saving}
                          className="w-full py-3 bg-accent text-accent-foreground font-sans text-xs tracking-[0.2em] uppercase rounded-xl hover:bg-accent/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {saving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Music className="w-4 h-4" />
                          )}
                          Додати до плейлисту
                        </button>
                      </div>
                    ) : (
                      /* Search */
                      <div>
                        <div className="relative mb-4">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="text"
                            value={query}
                            onChange={(e) => searchSongs(e.target.value)}
                            placeholder="Пошук пісні або виконавця..."
                            className="w-full border border-border bg-background rounded-xl pl-10 pr-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent"
                          />
                          {searching && (
                            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent animate-spin" />
                          )}
                        </div>

                        {results.length === 0 && query.length >= 2 && !searching && (
                          <p className="text-center font-body text-muted-foreground py-6">
                            Нічого не знайдено
                          </p>
                        )}

                        {results.length === 0 && query.length < 2 && (
                          <div className="text-center py-8">
                            <Music className="w-10 h-10 text-accent/40 mx-auto mb-3" />
                            <p className="font-body text-muted-foreground text-sm">
                              Введіть назву пісні або виконавця
                            </p>
                          </div>
                        )}

                        <div className="space-y-2">
                          {results.map((song) => (
                            <motion.div
                              key={song.trackId}
                              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-accent/10 transition-colors"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              {song.artworkUrl100 ? (
                                <img
                                  src={song.artworkUrl100}
                                  alt=""
                                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                                  <Music className="w-5 h-5 text-muted-foreground" />
                                </div>
                              )}
                              <button
                                onClick={() => setSelectedSong(song)}
                                className="flex-1 min-w-0 text-left"
                              >
                                <p className="font-display text-sm text-foreground truncate">
                                  {song.trackName}
                                </p>
                                <p className="font-body text-xs text-muted-foreground truncate">
                                  {song.artistName}
                                </p>
                              </button>
                              {song.previewUrl && (
                                <button
                                  onClick={() => togglePlay(song.previewUrl!)}
                                  className="w-8 h-8 rounded-full bg-accent/10 hover:bg-accent/20 flex items-center justify-center text-accent flex-shrink-0 transition-colors"
                                >
                                  {playingUrl === song.previewUrl ? (
                                    <Pause className="w-4 h-4" />
                                  ) : (
                                    <Play className="w-4 h-4 translate-x-px" />
                                  )}
                                </button>
                              )}
                              <button onClick={() => setSelectedSong(song)}>
                                <Plus className="w-5 h-5 text-accent flex-shrink-0" />
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="playlist"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    {loadingPlaylist ? (
                      <div className="flex justify-center py-10">
                        <Loader2 className="w-6 h-6 text-accent animate-spin" />
                      </div>
                    ) : playlist.length === 0 ? (
                      <div className="text-center py-10">
                        <Music className="w-10 h-10 text-accent/40 mx-auto mb-3" />
                        <p className="font-body text-muted-foreground">
                          Поки що немає пісень. Будьте першими!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {playlist.map((item, i) => (
                          <motion.div
                            key={item.id}
                            className="flex items-center gap-3 p-3 rounded-xl bg-card"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            {item.artwork_url ? (
                              <img
                                src={item.artwork_url}
                                alt=""
                                className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
                              />
                            ) : (
                              <div className="w-11 h-11 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                                <Music className="w-5 h-5 text-muted-foreground" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-display text-sm text-foreground truncate">
                                {item.song_title}
                              </p>
                              <p className="font-body text-xs text-muted-foreground truncate">
                                {item.artist_name}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="font-sans text-[10px] text-muted-foreground/70">
                                від {item.guest_name}
                              </span>
                              {item.preview_url && (
                                <button
                                  onClick={() => togglePlay(item.preview_url!)}
                                  className="w-7 h-7 rounded-full bg-accent/10 hover:bg-accent/20 flex items-center justify-center text-accent transition-colors"
                                >
                                  {playingUrl === item.preview_url ? (
                                    <Pause className="w-3.5 h-3.5" />
                                  ) : (
                                    <Play className="w-3.5 h-3.5 translate-x-px" />
                                  )}
                                </button>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
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

export default MusicRequestPopup;
