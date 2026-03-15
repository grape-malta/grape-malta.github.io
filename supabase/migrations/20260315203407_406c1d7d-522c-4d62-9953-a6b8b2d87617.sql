
CREATE POLICY "Users can view own registrations by email"
  ON public.registrations FOR SELECT
  TO authenticated
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));
