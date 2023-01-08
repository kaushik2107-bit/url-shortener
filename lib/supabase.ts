import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  `https://${process.env.NEXT_PUBLIC_PROJECT}.supabase.co`,
  process.env.NEXT_PUBLIC_ANON_KEY as string
);
