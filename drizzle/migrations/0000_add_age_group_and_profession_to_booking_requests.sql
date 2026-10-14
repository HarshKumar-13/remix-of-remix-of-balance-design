ALTER TABLE public.booking_requests
  ADD COLUMN IF NOT EXISTS age_group text,
  ADD COLUMN IF NOT EXISTS profession text;