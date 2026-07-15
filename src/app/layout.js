import { Playfair_Display, Inter, Amiri } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-arabic",
});

export const metadata = {
  title: "Invetini - Votre Invitation de Mariage",
  description: "Célébrez avec nous cette journée inoubliable.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${inter.variable} ${playfair.variable} ${amiri.variable}`}
    >
      <body className="antialiased bg-[#0c0a09] text-stone-100 font-[family-name:var(--font-arabic)]">
        {children}
      </body>
    </html>
  );
}
