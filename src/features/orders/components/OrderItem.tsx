import Image from "next/image";
import { OrderCartItem } from "../types/order.types";

export default function OrderItem({ item }: { item: OrderCartItem }) {
  return (
    <>
      <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100">
        <div className="w-16 h-16 rounded-xl bg-gray-50 p-2 shrink-0">
          <Image
            alt={item.product.title}
            className="w-full h-full object-contain"
            src={item.product.imageCover}
            width={64}
            height={64}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 truncate">{item.product.title}</p>
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-medium text-gray-700">{item.count}</span> × {item.price} EGP
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-lg font-bold text-gray-900">{item.price * item.count}</p>
          <p className="text-xs text-gray-400">EGP</p>
        </div>
      </div>
    </>
  );
}
