import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import "../lib/fontawesome";
import Providers from "@/components/providers/Providers";
import { verifyToken } from "@/features/auth/server/auth.actions";
import icon from "../assets/images/favicon.ico";

const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: "FreshCart",
  description: "FreshCart Ecommerce App",
  icons : {
    icon: icon.src,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authValue = await verifyToken();  
  return (
    <html lang="en">
      <body className={`${exo.className} font-medium`}>
        <Providers preloadedState={{auth: authValue}}>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
