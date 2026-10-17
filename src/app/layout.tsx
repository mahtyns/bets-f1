import type { Metadata } from "next";
import { getNextRace } from "@/app/data/next-race";
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
import { getBetsWindow } from "./data/bets-window";


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
  const betsWindow = nextRace ? await getBetsWindow(nextRace.meetingKey) : null;

  const value = {
    nextRace,
    betsOpensAt: betsWindow?.opensAt ?? null,
    betsClosesAt: betsWindow?.locksAt ?? null,
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