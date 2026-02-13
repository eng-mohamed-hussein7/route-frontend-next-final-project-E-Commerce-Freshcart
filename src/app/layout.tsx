import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/shared/LayoutComponents/Navbar";
import Footer from "@/components/shared/LayoutComponents/Footer";
import "../lib/fontawesome";
import Providers from "@/components/providers/Providers";
import { verifyToken } from "@/features/auth/server/auth.actions";
import icon from "../assets/images/favicon.ico";
import { CartState } from "@/features/cart/store/cart.slice";
import { getLoggedUserCart } from "@/features/cart/server/cart.action";

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

let defaultCartState : CartState ={
  numOfCartItems: 0,
  isLoading: false, 
  error: null,  
  cartId: "",
  products: [],
  totalCartPrice: 0,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authValue = await verifyToken();  

let cartState = defaultCartState;
  if(authValue.isAuthenticated){
    try {
      
      const cartValue = await getLoggedUserCart();
      cartState = {
        cartId: cartValue.cartId,
        totalCartPrice: cartValue.data.totalCartPrice,
        isLoading: false,
        products: cartValue.data.products,
        numOfCartItems: cartValue.numOfCartItems,
        error: null,
      }
    } catch (error) {
      cartState = defaultCartState;
    }
  }

  return (
    <html lang="en">
      <body className={`${exo.className} font-medium`}>
        <Providers preloadedState={{auth: authValue, cart: cartState}}>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
