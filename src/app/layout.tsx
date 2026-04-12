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
  metadataBase: new URL("https://anasx07.github.io/AutaKimi-Release"),
  title: "AutaKimi - The Ultimate Manga Reader",
  description: "The ultimate manga experience on Windows. Free, extensible, and built for speed.",
  keywords: ["Manga", "Reader", "Windows", "AutaKimi", "Anime", "Free", "Extensions", "Arabic localization"],
  icons: {
    icon: "/AutaKimi-Release/favicon.svg",
    shortcut: "/AutaKimi-Release/favicon.svg",
    apple: "/AutaKimi-Release/assets/icon.png",
  },
  openGraph: {
    title: "AutaKimi - The Ultimate Manga Reader",
    description: "The ultimate manga experience on Windows. Free, extensible, and built for speed.",
    url: "https://anasx07.github.io/AutaKimi-Release",
    siteName: "AutaKimi",
    images: [
      {
        url: "/AutaKimi-Release/assets/icon.png",
        width: 512,
        height: 512,
        alt: "AutaKimi Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://anasx07.github.io/AutaKimi-Release",
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
