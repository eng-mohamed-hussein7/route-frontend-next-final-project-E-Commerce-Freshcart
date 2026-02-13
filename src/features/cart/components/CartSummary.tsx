import { faTruck } from "@fortawesome/free-regular-svg-icons";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { CartState } from "../store/cart.slice";

export default function CartSummary({ details }: { details: CartState }) {
  const { numOfCartItems , totalCartPrice } = details;
  const shipping = totalCartPrice > 500 ? 0 : 100;
  const Discount = 3.25;
  const Tax = 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-4">
      <div className="p-5">
        <h2 className="font-bold text-xl text-gray-800">Order Summary</h2>
      </div>
      <div className="p-5 space-y-4">
        {shipping > 0 && (
          <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <FontAwesomeIcon icon={faTruck} className="text-orange-500" />
              <span className="text-sm Font-medium text-gray-700">
                Add {500 - totalCartPrice} EGP for free shipping
              </span>
            </div>
            <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${(totalCartPrice / 500) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {shipping === 0 && (
          <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-fullbg-green-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faTruck} className="text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-green-700">Free Shipping!</p>
              <p className="text-sm text-green-600">You qualify for free delivery</p>
            </div>
          </div>
        )}
        <div className="flex justify-between text-gray-600">
          <span>Subtotal {numOfCartItems} {" "} {numOfCartItems === 1 ? "item" : "items"}</span>
          <span className="font-semibold">${totalCartPrice}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          {shipping === 0 ? (
            <span className="text-green-600 font-medium">Free</span>
          ) : (
            <span className="font-medium text-gray-900">${shipping.toLocaleString()}</span>
          )}
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Discount (FRESH20)</span>
          <span className="text-green-600 font-medium">-${Discount}</span>
        </div> 
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span className="font-semibold">${Math.round(totalCartPrice * 0.14)}</span>
        </div>
        <hr className="border-gray-200" />
        <div className="flex justify-between text-lg font-bold">
          <span className="text-gray-800">Total</span>
          <span className="text-primary-600">${Math.round(totalCartPrice + shipping - Discount + Tax)}</span>
        </div>
        <div className="pt-4 space-y-3">
          <Link
            className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-3.5 rounded-xl font-semibold hover:bg-primary-700 transition-all"
            href="/login?redirect=/cart"
          >
            Proceed to Checkout
          </Link>
        </div>
        <div className="pt-4 space-y-2">
          <div className="flex flex-col justify-center items-start gap-2 p-5 bg-gray-50 border-gray-100 hover:bg-primary-50 border hover:border-primary-200 rounded-lg transition-all duration-300">
            <div className="flex items-center gap-2 font-semibold text-gray-800 text-lg">
              <FontAwesomeIcon icon={faTruck} className="text-primary-600" />
              <p>Free Delivery</p>
            </div>
            <p className="text-md text-gray-500">Your order qualifies for free delivery. Estimated delivery: 2-3 business days</p>
          </div>
        </div>
        <div className="pt-4 space-y-2">
          <div className="flex flex-col justify-center items-start gap-2 p-5 bg-gray-50 border-gray-100 hover:bg-primary-50 border hover:border-primary-200 rounded-lg transition-all duration-300">
            <div className="flex items-center gap-2 font-semibold text-gray-800 text-lg">
              <FontAwesomeIcon icon={faShieldHalved} className="text-primary-600" />
              <p>Secure Payment</p>
            </div>
            <p className="text-md text-gray-500">Your payment information is protected with 256-bit SSL encryption</p>
          </div>
        </div>
      </div>
    </div>

  )
}