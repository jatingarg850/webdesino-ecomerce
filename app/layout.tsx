import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/shell/site-header";
import { SiteFooter } from "@/components/shell/site-footer";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "Pocket Mouse | Premium Denim for Everyone",
  description: "High-quality denim accessible to everyone. Born in Northeast India. Premium feel at ₹1000-₹1200.",
  icons: {
    icon: [
      { url: '/logo/logoo.png', sizes: 'any' },
      { url: '/logo/logoo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo/logoo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/logo/logoo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/logo/logoo.png',
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
        <link rel="icon" href="/logo/logoo.png" type="image/png" />
        <link rel="shortcut icon" href="/logo/logoo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo/logoo.png" />
      </head>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
