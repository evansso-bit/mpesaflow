import type { Metadata } from "next";
import "@mpesaflow/ui/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@mpesaflow/ui/cn";
import { calSans, inter } from "@mpesaflow/ui/styles/fonts";
import MainNav from "../components/main-nav";


export const metadata: Metadata = {
  title: {
    template: "%s | MpesaFlow",
    default: "MpesaFlow | Streamline M-Pesa Payments & Boost Growth",
  },
  description: "Effortlessly integrate M-Pesa payments, simplify transactions, and accelerate your business growth with MpesaFlow.",
  openGraph: {
    type: "website",
    url: "https://mpesaflow.com",
    title: "MpesaFlow",
    description: "Effortlessly integrate M-Pesa payments, simplify transactions, and accelerate your business growth with MpesaFlow.",
    images: [
      {
        url: "https://utfs.io/f/qGGrTNysMsOSIr2gQD33Of1dHwtC0VqYaS9LyiT2DXeWkMmK",
        width: 1200,
        height: 630,
        alt: "MpesaFlow",
      },
    ],
    siteName: "MpesaFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "MpesaFlow",
    description: "Effortlessly integrate M-Pesa payments, simplify transactions, and accelerate your business growth with MpesaFlow.",
    images: [
      {
        url: "https://utfs.io/f/qGGrTNysMsOSIr2gQD33Of1dHwtC0VqYaS9LyiT2DXeWkMmK",
        width: 1200,
        height: 630,
        alt: "MpesaFlow",
      },
    ],
    site: "@MpesaFlow",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <head>
          <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </head>
        <body className={cn("flex flex-col min-h-screen antialiased w-full bg-background text-foreground font-inter", inter.variable, calSans.variable)}>
          <MainNav />
          <div>{children}</div>
        </body>
      </ClerkProvider>
    </html>
  );
}
