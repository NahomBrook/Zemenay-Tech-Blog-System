import type { Metadata } from "next";
import { ThemeProvider } from "@/utils/theme-provider";
import { Inter } from 'next/font/google';
import { NavbarSwitcher } from "@/components/NavbarSwitcher";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Zemenay",
  description: "A one stop shop for your tech needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <NavbarSwitcher />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
