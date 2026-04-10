
CREATE TABLE public.guestbook (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.guestbook ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read guestbook" ON public.guestbook FOR SELECT USING (true);
CREATE POLICY "Anyone can insert into guestbook" ON public.guestbook FOR INSERT WITH CHECK (true);
