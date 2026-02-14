"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
  faBox,
  faClock,
  faHashtag,
  faMoneyBill,
  faCalendarDays,
  faLocationDot,
  faChevronDown,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { Order } from "../types/order.types";
import { useState } from "react";
import OrderDetails from "./OrderDetails";

export default function OrderCard({ order }: { order: Order }) {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  return (
    <>
      <div className="bg-white rounded-2xl border transition-all duration-300 overflow-hidden border-primary-200 shadow-lg shadow-primary-100/50">
        <div className="p-5 sm:p-6">
          <div className="flex gap-5">

            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-2.5 overflow-hidden">
                <Image
                  alt={order.cartItems[0].product.title}
                  className="w-full h-full object-contain"
                  src={order.cartItems[0].product.imageCover}
                  width={112}
                  height={112}
                />
              </div>
              {order.cartItems.length > 1 && (
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                  +{order.cartItems.length - 1}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  {order.isPaid ? (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 rounded-lg mb-2">
                      <FontAwesomeIcon
                        icon={faTruck}
                        className="text-xs text-blue-600"
                      />
                      <span className="text-xs font-semibold text-blue-600">
                        On the way
                      </span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 rounded-lg mb-2">
                      <FontAwesomeIcon
                        icon={faClock}
                        className="text-xs text-amber-600"
                      />
                      <span className="text-xs font-semibold text-amber-600">
                        Processing
                      </span>
                    </div>
                  )}

                  <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faHashtag}
                      className="text-xs text-gray-400"
                    />
                    {order.id}
                  </h3>
                </div>

                {order.paymentMethodType === "cash" ? (
                  <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100">
                    <FontAwesomeIcon
                      icon={faMoneyBill}
                      className="text-gray-600"
                    />
                  </div>
                ) : (
                  <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-purple-100">
                    <FontAwesomeIcon
                      icon={faCreditCard}
                      className="text-purple-600"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1.5">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="text-xs text-gray-400"
                  />
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="flex items-center gap-1.5">
                  <FontAwesomeIcon
                    icon={faBox}
                    className="text-xs text-gray-400"
                  />
                  {order.cartItems.length === 1
                    ? `${order.cartItems.length} item`
                    : `${order.cartItems.length} items`}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="flex items-center gap-1.5">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-xs text-gray-400"
                  />
                  {order.shippingAddress.city}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    {order.totalOrderPrice}
                  </span>
                  <span className="text-sm font-medium text-gray-400 ml-1">
                    EGP
                  </span>
                </div>
                {showDetails ? (
                  <button
                    onClick={() => setShowDetails(false)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all bg-primary-600 text-white shadow-lg shadow-primary-600/25"
                  >
                    Hide
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="text-xs transition-transform duration-300 rotate-180"
                    />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowDetails(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    Details
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="text-xs transition-transform duration-300"
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <OrderDetails order={order} showDetails={showDetails} />
      </div>
    </>
  );
}
