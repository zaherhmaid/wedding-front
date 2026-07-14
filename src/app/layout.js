import { Playfair_Display, Inter } from "next/font/google";
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

export const metadata = {
  title: "Invetini - Votre Invitation de Mariage",
  description: "Célébrez avec nous cette journée inoubliable.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${inter.variable}${playfair.variable}`}>
      <body className="antialiased bg-[#fdfbf7] text-slate-800">
        {children}
      </body>
    </html>
  );
}
