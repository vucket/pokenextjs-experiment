import "semantic-ui-css/semantic.min.css";
import "../styles/globals.css";
import { Inter } from "@next/font/google";
import type { AppProps } from "next/app";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.className} ${styles.main}`}>
      <Component {...pageProps} />
    </main>
  );
}
