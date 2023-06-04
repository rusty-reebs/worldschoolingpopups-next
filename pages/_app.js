import "@/components/styles/globals.css";
import { Merriweather_Sans } from "next/font/google";
import Script from "next/script";
import { FilterProvider } from "../contexts/context";
import { useState, useEffect } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
// import { GoogleAnalytics } from "nextjs-google-analytics";
import * as gtag from "../lib/gtag";
import { useRouter } from "next/router";

const merriweatherSans = Merriweather_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  );

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <main
      className={`${merriweatherSans.className} bg-yellow text-black min-h-screen w-full`}
    >
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <FilterProvider>
          {/* <GoogleAnalytics trackPageViews /> */}
          <Component {...pageProps} />
        </FilterProvider>
        <Script src="https://upload-widget.cloudinary.com/global/all.js" />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
          `,
          }}
        />
      </SessionContextProvider>
    </main>
  );
}
