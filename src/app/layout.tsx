import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Listing Signal™ | Know What Your Home Is Worth — Free Instant Report",
  description:
    "Enter your address and get an instant home value estimate plus your Signal to Sell™ score — free, no commitment. See if now is the right time to sell.",
  keywords: [
    "home value estimate",
    "what's my home worth",
    "sell my house",
    "real estate market report",
    "home selling signal",
  ],
  metadataBase: new URL("https://listingsignal.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Listing Signal™ | Know What Your Home Is Worth",
    description:
      "Get your free instant home value estimate and Signal to Sell™ score — see if today's market is working in your favor.",
    url: "https://listingsignal.com",
    siteName: "Listing Signal",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <main>
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
