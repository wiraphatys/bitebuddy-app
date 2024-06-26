import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopMenu from "@/components/Topmenu";
import Footer from "@/components/Footer";
import ReduxProvider from "@/redux/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BiteBuddy",
  description: "At Bitebuddy, we're more than just a reservation platform. We're your dedicated partner in sharing your culinary passion with the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
        {/* <TopMenu/> */}
        <div className="min-h-[50vh]">
        {children}
        </div>
        <Footer/>
        </ReduxProvider>
      </body>
    </html>
  );
}
