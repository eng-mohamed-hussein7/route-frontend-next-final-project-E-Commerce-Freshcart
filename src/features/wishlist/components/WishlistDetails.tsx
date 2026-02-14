import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHeart } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import WishlistItem from "./WishlistItem";
import { Product } from "@/features/products/types/products.types";
import { WishlistState } from "../store/wishlist.slice";

export default function WishlistDetails({
  response,
}: {
  response: WishlistState;
}) {
  const { data, count } = response;
  const products = data as Product[];

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
            <FontAwesomeIcon icon={faHeart} className="text-xl text-red-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-500 text-sm">
              {count} {count === 1 ? "item" : "items"} saved
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
          <div className="col-span-6">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-center">Actions</div>
        </div>

        <div className="divide-y divide-gray-100">
          {products.map((product: Product) => (
            <WishlistItem key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Link
          className="text-gray-500 hover:text-primary-600 text-sm font-medium transition-colors"
          href="/"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="size-4" />{" "}
          Continue Shopping
        </Link>
      </div>
    </>
  );
}
