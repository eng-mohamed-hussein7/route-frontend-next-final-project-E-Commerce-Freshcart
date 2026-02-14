"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  shippingAddressSchema,
  shippingAddress,
} from "../schemas/checkout.schema";
import ShippingForm from "../components/ShippingForm";
import PaymentMethod from "../components/PaymentMethod";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { createCashOrder, createOnlineOrder } from "../server/checkout.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { clearCart } from "@/features/cart/store/cart.slice";
import OrderSummary from "../components/OrderSummary";

export default function CheckoutScreen() {
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");

  const router = useRouter();
  const { cartId } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<shippingAddress>({
    resolver: zodResolver(shippingAddressSchema),

    mode: "onSubmit",

    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<shippingAddress> = async (
    data: shippingAddress,
  ) => {
    try {
      if (!cartId) {
        return;
      }
      if (paymentMethod === "cash") {
        const response = await createCashOrder({
          cartId,
          shippingAddress: data,
        });
        if (response.status === "success") {
          reset();
          dispatch(clearCart());
          toast.success("Order created successfully");
          setTimeout(() => {
            router.push("/allorders");
          }, 3000);
        }
      } else {
        const response = await createOnlineOrder({
          cartId,
          shippingAddress: data,
          redirectUrl: location.origin,
        });
        if (response.status === "success") {
          dispatch(clearCart());
          toast.loading("Redirecting to payment page...");
          setTimeout(() => {
            location.href = response.session.url;
          }, 3000);
        }
      }
    } catch (error) {}
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Breadcrumbs
            links={[
              { href: "/cart", label: "Cart" },
              { href: "/checkout", label: "Checkout" },
            ]}
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-gradient-to-br from-primary-600 to-primary-700 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20">
                  <FontAwesomeIcon icon={faReceipt} />
                </span>
                Complete Your Order
              </h1>
              <p className="text-gray-500 mt-2">
                Review your items and complete your purchase
              </p>
            </div>
            <Link
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all"
              href="/cart"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to Cart
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <ShippingForm register={register} errors={errors} />

              <PaymentMethod
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            </div>

            <OrderSummary />
          </div>
        </form>
      </div>
    </div>
  );
}
