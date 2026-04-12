import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "AutaKimi - The Ultimate Manga Reader",
  description: "The ultimate manga experience on Windows. Open-source, extensible, and built for speed.",
  icons: {
    icon: "/AutaKimi-Release/favicon.svg",
    shortcut: "/AutaKimi-Release/favicon.svg",
    apple: "/AutaKimi-Release/assets/icon.png",
  },
  verification: {
    google: "oLob_47r8e6mHEe8beX6u_sSm-eGtaljDpJQkZ_jeuw",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
