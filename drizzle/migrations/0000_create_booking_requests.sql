CREATE TABLE public.booking_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  workshop TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.booking_requests TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.booking_requests TO authenticated;
GRANT ALL ON public.booking_requests TO service_role;

ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a booking request"
ON public.booking_requests
FOR INSERT
TO anon
WITH CHECK (true);