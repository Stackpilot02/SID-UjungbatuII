import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-body" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-heading" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "SID — Desa Ujungbatu II",
  description: "Sistem Informasi Desa Ujungbatu II, Kec. Hutaraja Tinggi, Kab. Padang Lawas, Sumatera Utara",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${dmSans.variable} ${plusJakarta.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
