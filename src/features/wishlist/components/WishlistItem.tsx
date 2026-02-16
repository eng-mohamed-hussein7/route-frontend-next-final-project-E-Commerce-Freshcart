"use client";
import { Product } from "@/features/products/types/products.types";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "@/store/store";
import { addProductToCart, getLoggedUserCart } from "@/features/cart/server/cart.action";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store/store";
import { setCartInfo } from "@/features/cart/store/cart.slice";
import Swal from "sweetalert2";
import { removeProductFromWishlist } from "../server/wishlist.actions";
import { removeProduct } from "../store/wishlist.slice";

export default function WishlistItem({ product }: { product: Product }) {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const isProductInCart = cart.products.some(
    (item) => item.product._id === product.id,
  );

  const handleAddToCart = async () => {
     try {
        const response = await addProductToCart({productId: product.id});
            if(response.status === "success"){
              toast.success(response.message);
              const cartInfo = await getLoggedUserCart();  
              dispatch(setCartInfo(cartInfo));              
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
  }

    const handleRemoveFromWishlist = async () => {
      const result = await Swal.fire({
        html: `<div class="text-center py-2">
  <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
  <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
  </div>
  <h3 class="text-xl font-bold text-gray-900 mb-2">Remove Item?</h3>
  <p class="text-gray-500 text-sm leading-relaxed">
  Remove <span class="font-semibold text-gray-700">${product.title.slice(0, 40)}${product.title.length > 40 ? "..." : ""}</span> from your wishlist?
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
        try {
          const response = await removeProductFromWishlist({ productId: product.id });
          if (response.status === "success") {
            toast.success(response.message);
            dispatch(removeProduct({ productId: product.id }));
          }
        } catch (error) {
          toast.error("Something went wrong");
        }
      }
    };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors">
        <div className="md:col-span-6 flex items-center gap-4">
          <Link
            className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0"
            href={`/products/${product.id}`}
          >
            <Image
              alt={`${product.title} image`}
              className="w-full h-full object-contain p-2"
              src={product.imageCover}
              width={80}
              height={80}
            />
          </Link>
          <div className="min-w-0">
            <Link
              className="font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2"
              href={`/products/${product.id}`}
            >
              {product.title}
            </Link>
            <p className="text-sm text-gray-400 mt-1">
              {product.category.name}
            </p>
          </div>
        </div>

        <div className="md:col-span-2 flex md:justify-center items-center gap-2">
          <span className="md:hidden text-sm text-gray-500">Price:</span>
          <div className="text-right md:text-center">
            <div className="font-semibold text-gray-900">
              {product.priceAfterDiscount
                ? product.priceAfterDiscount
                : product.price}{" "}
              EGP
            </div>
            {product.priceAfterDiscount && (
              <div className="text-sm text-gray-400 line-through">
                {product.price} EGP
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2 flex md:justify-center">
          <span className="md:hidden text-sm text-gray-500 mr-2">Status:</span>
          {isProductInCart ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
              <FontAwesomeIcon icon={faCartShopping} className="text-[10px]" />
              In Cart
            </span>
          ) : (
            <>
            {product.quantity > 0 ? (
              <>
              {product.quantity >= 5 ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                  Low Stock
                </span>
              )}
              </>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Out of Stock
              </span>
            )}
            </>
          )}
        </div>
        <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
          {isProductInCart ? (
            <Link
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
              href="/cart"
            >
              <FontAwesomeIcon
                icon={faCheck}
                className="text-xs text-green-600"
              />
              <span className="md:hidden lg:inline">View Cart</span>
            </Link>
          ) : (
            <button className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all bg-primary-600 text-white hover:bg-primary-700">
              <FontAwesomeIcon icon={faCartShopping} className="text-xs" />
              <span className="md:hidden lg:inline" onClick={handleAddToCart}>Add to Cart</span>
            </button>
          )}
          <button
            className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all disabled:opacity-50"
            onClick={handleRemoveFromWishlist}
          >
            <FontAwesomeIcon icon={faTrash} className="text-sm" />
          </button>
        </div>
      </div>
    </>
  );
}
