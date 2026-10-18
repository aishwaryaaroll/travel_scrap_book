import { Caveat, Patrick_Hand, Quicksand } from "next/font/google";
import "@/styles/globals.css";

const caveat = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-caveat" });
const patrick = Patrick_Hand({ subsets: ["latin"], weight: "400", variable: "--font-patrick" });
const quicksand = Quicksand({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-quicksand" });

export const metadata = {
  title: "Postcards from Our Adventures",
  description: "A scrapbook of the places we have explored together.",
};

export const viewport = {
  themeColor: "#fceade",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${caveat.variable} ${patrick.variable} ${quicksand.variable}`}>
      <body>{children}</body>
    </html>
  );
}
