"use client"
import ShoppingCart from "../components/ShoppingCart";
import EmptyCart from "../components/EmptyCart";
import CouponSection from "../components/CouponSection";
import CartSummary from "../components/CartSummary";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useAppSelector } from "@/store/store";

export default function CartScreen() {
    const response = useAppSelector((state)=> state.cart)
    
  return (
    <>
    <div className="container mx-auto px-4 py-8">
        <Breadcrumbs links={[{ href: "/cart", label: "Cart" }]} /> 
        {
            response.numOfCartItems > 0 ? 
            <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="space-y-4">
                        <ShoppingCart response={response} />
                    </div>
                    <div className="mt-6">
                        <CouponSection />
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <CartSummary details={response} />
                    </div>
                </div>
            </div>
            </>
            :
            <EmptyCart />
        }
        {/* <RelatedProducts /> */}
    </div>
    </>
  )
}