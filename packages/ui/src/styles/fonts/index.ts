import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const calSans = localFont({
  src: "./fonts/CalSans-Regular.woff",
  variable: "--font-cal-sans",
  display: "swap",
});

export const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
});
