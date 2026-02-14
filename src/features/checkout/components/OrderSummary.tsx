import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHalved,
  faBagShopping,
  faTruck,
  faBox,
} from "@fortawesome/free-solid-svg-icons";
import OrderSummaryCard from "./OrderSummaryCard";
import { useAppSelector } from "@/store/store";

export default function OrderSummary() {
  const { products, numOfCartItems, totalCartPrice } = useAppSelector(
    (state) => state.cart,
  );

  return (
    <>
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-4">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FontAwesomeIcon icon={faBagShopping} />
              Order Summary
            </h2>
            <p className="text-primary-100 text-sm mt-1">
              {" "}
              {numOfCartItems === 1 ? "1 item" : numOfCartItems + " items"}
            </p>
          </div>

          <div className="p-5">
            {products.map((product) => (
              <OrderSummaryCard key={product._id} product={product} />
            ))}

            <hr className="border-gray-100 my-4" />

            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">{totalCartPrice} EGP</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faTruck} className="text-gray-400" />
                  Shipping
                </span>
                <span className="font-medium">
                  {totalCartPrice >= 500 ? "Free" : "50 EGP"}
                </span>
              </div>

              <hr className="border-gray-100" />

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-primary-600">
                    {totalCartPrice >= 500
                      ? totalCartPrice
                      : totalCartPrice + 50}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">EGP</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20 active:scale-[0.98]"
            >
              <FontAwesomeIcon icon={faBox} />
              Place Order
            </button>

            <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <FontAwesomeIcon
                  icon={faShieldHalved}
                  className="text-green-500"
                />
                <span>Secure</span>
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <FontAwesomeIcon icon={faTruck} className="text-blue-500" />
                <span>Fast Delivery</span>
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <FontAwesomeIcon icon={faBox} className="text-orange-500" />
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
