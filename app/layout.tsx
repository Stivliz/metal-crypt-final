import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
//heere
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Metal Crypt - The Ultimate Metal Database",
  description: "Discover the best heavy metal bands, genres, and discographies. Join the Metal Crypt community.",
  keywords: ["Heavy Metal", "Metal Crypt", "Bands", "Music Database", "Rock"],
  openGraph: {
    title: "Metal Crypt",
    description: "Discover the best heavy metal bands, genres, and discographies.",
    url: "https://metalcrypt.com",
    siteName: "Metal Crypt",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Metal Crypt Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Metal Crypt",
    description: "Discover the best heavy metal bands, genres, and discographies.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {" "}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4150271146613952"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${inter.className} `}>{children}</body>
    </html>
  );
}
