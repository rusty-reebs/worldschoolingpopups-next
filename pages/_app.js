import "@/components/styles/globals.css";
import { Merriweather_Sans } from "next/font/google";

const merriweatherSans = Merriweather_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <div className={merriweatherSans.className}>
      <Component {...pageProps} />
    </div>
  );
}
