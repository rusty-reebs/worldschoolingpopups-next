import "@/components/styles/globals.css";
import { Merriweather_Sans } from "next/font/google";
import Script from "next/script";
import { FilterProvider } from "../contexts/context";
import { useState, useEffect } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/react";

const merriweatherSans = Merriweather_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  );

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
          <Analytics />
        </FilterProvider>
        <Script src="https://upload-widget.cloudinary.com/global/all.js" />
      </SessionContextProvider>
    </main>
  );
}
