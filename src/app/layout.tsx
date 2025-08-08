import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/utils/theme-provider";
import { NavbarSwitcher } from "@/components/NavbarSwitcher";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "TechPulse",
  description: "Stay ahead with the latest in technology and innovation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The footer will be conditionally rendered in the page components
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <NavbarSwitcher />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
