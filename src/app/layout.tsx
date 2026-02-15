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
import { WishlistState } from "@/features/wishlist/store/wishlist.slice";
import { getLoggedUserWishlist } from "@/features/wishlist/server/wishlist.actions";
import { AddressState } from "@/features/profile/store/address.slice";
import { getLoggedUserAddress } from "@/features/profile/server/address.actions";

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

let defaultWishlistState : WishlistState ={
  count: 0,
  data: [],
  isLoading: false,
  error: null,
}

let defaultAddressState : AddressState = {
  results: 0,
  data: [],
  isLoading: false,
  error: null,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authValue = await verifyToken();  

let cartState = defaultCartState;
let wishlistState = defaultWishlistState;
let addressState = defaultAddressState;
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

      const wishlistValue = await getLoggedUserWishlist();
      wishlistState = {
        count: wishlistValue.count,
        data: wishlistValue.data,
        isLoading: false,
        error: null,
      }

      const addressValue = await getLoggedUserAddress();
      addressState = {
        results: addressValue.results,
        data: addressValue.data,
        isLoading: false,
        error: null,
      }
    } catch (error) {
      cartState = defaultCartState;
      wishlistState = defaultWishlistState;
      addressState = defaultAddressState;
    }
  }

  return (
    <html lang="en">
      <body className={`${exo.className} font-medium`}>
        <Providers preloadedState={{auth: authValue, cart: cartState, wishlist: wishlistState, address: addressState}}>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
