
CREATE TABLE public.song_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name TEXT NOT NULL,
  song_title TEXT NOT NULL,
  artist_name TEXT NOT NULL,
  artwork_url TEXT,
  preview_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.song_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view song requests"
ON public.song_requests FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert song requests"
ON public.song_requests FOR INSERT
WITH CHECK (true);
