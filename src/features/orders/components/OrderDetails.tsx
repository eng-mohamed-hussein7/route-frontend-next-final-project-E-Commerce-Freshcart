import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faLocationDot,
  faPhone,
  faReceipt,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

import { Order } from "../types/order.types";
import OrderItem from "./OrderItem";
export default function OrderDetails({
  order,
  showDetails,
}: {
  order: Order;
  showDetails: boolean;
}) {
  return (
    <>
      <div
        className={`border-t border-gray-100 bg-gray-50/50 ${showDetails ? "block" : "hidden"}`}
      >
        <div className="p-5 sm:p-6">
          <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-lg bg-primary-100 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faReceipt}
                className="text-xs text-primary-600"
              />
            </div>
            Order Items
          </h4>
          <div className="space-y-3">
            {order.cartItems.map((item) => (
              <OrderItem key={item.product._id} item={item} />
            ))}
          </div>
        </div>

        <div className="px-5 sm:px-6 pb-5 sm:pb-6 grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-xl border border-gray-100">
            <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-xs text-blue-600"
                />
              </div>
              Delivery Address
            </h4>
            <div className="space-y-2">
              <p className="font-medium text-gray-900">
                {order.shippingAddress.city}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {order.shippingAddress.details}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2 pt-1">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-xs text-gray-400"
                />
                {order.shippingAddress.phone}
              </p>
            </div>
          </div>
          <div
            className={`p-4 rounded-xl bg-${order.isPaid ? "blue" : "amber"}-100 border border-${order.isPaid ? "blue" : "amber"}-200`}
          >
            <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
              <div
                className={`w-6 h-6 rounded-lg bg-${order.isPaid ? "blue" : "amber"}-500 flex items-center justify-center`}
              >
                <FontAwesomeIcon
                  icon={order.isPaid ? faTruck : faClock}
                  className="text-xs text-white"
                />
              </div>
              Order Summary
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">{order.totalOrderPrice} EGP</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <hr className="border-gray-200/50 my-2" />
              <div className="flex justify-between pt-1">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-lg text-gray-900">
                  {order.totalOrderPrice} EGP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
