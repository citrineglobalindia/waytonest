import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// This is a safer wrapper around the auto-generated client.
// In some preview environments, VITE_SUPABASE_URL can temporarily be undefined,
// but we can deterministically derive the URL from the project id.
const PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID;
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || (PROJECT_ID ? `https://${PROJECT_ID}.supabase.co` : "");
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
