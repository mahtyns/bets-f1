import type { Metadata } from "next";
import { getNextRace } from "@/app/data/next-race";
import { getBetsOpensAt } from "@/app/data/bets-status";
import { NextRaceProvider } from "@/app/context/NextRaceContext";
import {
  Barlow_Condensed,
  Hanken_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import AuthBoundary from "./components/organisms/AuthBoundary";


const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-hanken-grotesk",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rosario Bets F1 Predictions",
  description: "Bet on your favourite driver.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nextRace = await getNextRace();

  const value = {
    nextRace,
    betsOpensAt: nextRace ? new Date(getBetsOpensAt(nextRace)).toISOString() : null,
    betsClosesAt: nextRace ? nextRace.start : null,
  };


  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${hankenGrotesk.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        <AuthBoundary>
          <NextRaceProvider value={value}>
            <Header />
            {children}
            <Footer />
          </NextRaceProvider>
        </AuthBoundary>
      </body>
    </html>
  );
}