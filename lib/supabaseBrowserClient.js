import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

export const supabaseBrowserClient = createBrowserSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
