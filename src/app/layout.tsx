'use client';

import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/utils/theme-provider";
import { NavbarSwitcher } from "@/components/NavbarSwitcher";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { Chatbot } from "@/components/Chatbot";
import Providers from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

//TODO: Add metadata later
function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideFooter = ['/', '/auth/login', '/auth/signup'].includes(pathname);
  
  return (
    <>
      <NavbarSwitcher />
      <main className="min-h-screen pt-16 md:pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
      {!hideFooter && <Footer />}
      <Toaster />
      <Chatbot />
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body className={`${inter.className} max-w-[100vw] overflow-x-hidden`}>
        <Providers>
          <ThemeProvider>
            <LayoutContent>{children}</LayoutContent>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
