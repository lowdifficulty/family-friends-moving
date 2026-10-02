import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QuoteProvider from "@/components/QuoteProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Family Friends Moving | LA, Orange & San Diego County Movers",
  description:
    "Local and long-distance moving across Los Angeles, Orange, and San Diego counties. Get a free quote from Family Friends Moving.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        <QuoteProvider>{children}</QuoteProvider>
      </body>
    </html>
  );
}
