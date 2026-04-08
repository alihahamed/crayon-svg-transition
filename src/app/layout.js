import { DM_Sans, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import TransitionProvider from "@/providers/TransitionProvider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dmsans",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-barlowcondensed",
});

export const metadata = {
  title: "Smooth Transition",
  description: "A minimal black and white site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${barlowCondensed.variable}`}>
      <body>
        <Navbar />
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
