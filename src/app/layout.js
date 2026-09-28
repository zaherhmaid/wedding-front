import { Cormorant_Garamond, Amiri } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-arabic",
});

export const metadata = {
  title: "Invetini — دعوات زفاف رقمية",
  description: "دعوات زفاف أنيقة مع عدّ تنازلي وبرنامج الحفل وتأكيد الحضور.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cormorant.variable} ${amiri.variable}`}
    >
      <body className="antialiased font-[family-name:var(--font-arabic)]">
        {children}
      </body>
    </html>
  );
}
