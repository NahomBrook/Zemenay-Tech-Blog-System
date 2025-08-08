import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/utils/theme-provider";
import { NavbarSwitcher } from "@/components/NavbarSwitcher";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import Providers from "./providers"; // Client wrapper
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TechPulse",
  description: "Stay ahead with the latest in technology and innovation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider>
            <NavbarSwitcher />
            <main className="min-h-screen pt-16 md:pt-20">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {children}
              </div>
            </main>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
