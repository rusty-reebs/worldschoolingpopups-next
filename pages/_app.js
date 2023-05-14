import "@/components/styles/globals.css";
import { Merriweather_Sans } from "next/font/google";
import Script from "next/script";
import { FilterProvider } from "../contexts/context";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabaseBrowserClient } from "../lib/supabaseBrowserClient";

const merriweatherSans = Merriweather_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  // const [supabaseClient] = useState(() => supabaseBrowserClient);
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <main
      className={`${merriweatherSans.className} bg-yellow text-black min-h-screen w-full`}
    >
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <FilterProvider>
          <Component {...pageProps} />
        </FilterProvider>
        <Script src="https://upload-widget.cloudinary.com/global/all.js" />
      </SessionContextProvider>
    </main>
  );
}
