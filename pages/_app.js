import "@/components/styles/globals.css";
import { Merriweather_Sans } from "next/font/google";

const merriweatherSans = Merriweather_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <main
      className={`${merriweatherSans.className} bg-yellow text-black min-h-screen w-full`}
    >
      <Component {...pageProps} />
    </main>
  );
}
