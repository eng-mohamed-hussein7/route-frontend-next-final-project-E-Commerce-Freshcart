"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartItem as ICartItem } from "../types/Cart.type";
import {
  faMinus,
  faPlus,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Swal from "sweetalert2";
import {
  removeProductFromCart,
  updateProductQuantity,
} from "../server/cart.action";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store/store";
import { removeProduct, setCartInfo } from "../store/cart.slice";

export default function CartItem({ item }: { item: ICartItem }) {
  const dispatch = useAppDispatch();
  const handleRemoveFromCart = async () => {
    const result = await Swal.fire({
      html: `<div class="text-center py-2">
<div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
<svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>
</div>
<h3 class="text-xl font-bold text-gray-900 mb-2">Remove Item?</h3>
<p class="text-gray-500 text-sm leading-relaxed">
Remove <span class="font-semibold text-gray-700">${item.product.title.slice(0, 40)}${item.product.title.length > 40 ? "..." : ""}</span> from your cart?
</p> </div>`,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Yes, Remove it!",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        popup: "rounded-2xl shadow-2xl border-0 p-0",
        htmlContainer: "p-6 m-0",
        actions: "px-6 pb-6 pt-0 flex-row-reverse gap-3",
        confirmButton:
          "bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200",
        cancelButton:
          "bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-colors duration-200",
      },
    });
    if (result.isConfirmed) {
      dispatch(removeProduct({ productId: item.product._id }));
      await removeProductFromCart({ productId: item.product._id });
      toast.success("Product removed successfully");
    }
  };

  const handleUpdateQuantity = async (count: number) => {
    if (count < 1) return;

    try {
      
      // dispatch(updateProduct({productId: item.product._id, count}));
      const response = await updateProductQuantity({
        productId: item.product._id,
        count,
      });
      if (response.status === "success") {
        dispatch(setCartInfo(response));
        toast.success("Product quantity updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update product quantity");
    }
  };
  return (
    <div
      key={item._id}
      className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-t border-gray-100 gap-4 md:gap-0"
    >
      <div className="flex gap-3 w-full md:w-auto">
        <img
          src={item.product.imageCover}
          alt={item.product.title}
          className="w-20 h-20 md:w-24 md:h-24 rounded-md object-cover bg-gray-100 shrink-0"
        />
        <div className="flex flex-col justify-center">
          <Link href={`/product/${item.product._id}`} className="group/title">
            <h3 className="font-bold text-gray-800 text-sm md:text-base line-clamp-2 group-hover/title:text-primary-600 transition-colors duration-300">
              {item.product.title}
            </h3>
          </Link>
          <p className="text-xs md:text-sm text-gray-500">
            {item.product.category.name}
          </p>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                className={`text-xs ${i < Math.floor(item.product.ratingsAverage) ? "text-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="text-xs text-gray-400 ml-1">
              {item.product.ratingsAverage} ({item.product.ratingsAverage})
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full md:w-auto gap-3 pl-24 md:pl-0">
        <div className="flex items-center border rounded-md border-gray-200">
          <button
            className="p-1 px-2 md:p-2 hover:bg-gray-100 text-gray-600 transition-colors duration-300 border-r border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleUpdateQuantity(item.count - 1)}
            disabled={item.count === 1}
          >
            <FontAwesomeIcon icon={faMinus} size="xs" />
          </button>
          <span className="px-2 font-medium w-8 text-center text-sm">
            {item.count}
          </span>
          <button
            className="p-1 px-2 md:p-2 hover:bg-gray-100 text-gray-600 transition-colors duration-300 border-l border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleUpdateQuantity(item.count + 1)}
            disabled={item.count === item.product.quantity}
          >
            <FontAwesomeIcon icon={faPlus} size="xs" />
          </button>
        </div>
        <div className="flex items-center gap-2 ml-auto md:ml-0">
          <div className="text-right">
            <p className="font-bold text-base md:text-lg text-gray-800">
              ${item.price.toFixed(2)}
            </p>
            {item.price.toFixed(2) > item.price.toFixed(2) && (
              <p className="text-xs md:text-sm text-gray-400 line-through">
                ${item.price.toFixed(2)}
              </p>
            )}
          </div>
          <button
            className="text-red-600 hover:text-red-700 transition-colors duration-300 p-2"
            onClick={handleRemoveFromCart}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
}
