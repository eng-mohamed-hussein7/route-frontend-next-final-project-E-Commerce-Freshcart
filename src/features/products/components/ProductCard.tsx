import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEye } from "@fortawesome/free-regular-svg-icons";
import {
  faPlus,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { Product } from "../types/products.types";
import Ratings from "@/components/ui/Ratings";

export default function ProductCard({ info }: { info: Product }) {
  const {
    _id,
    category,
    title,
    imageCover,
    ratingsAverage,
    ratingsQuantity,
    price,
    priceAfterDiscount,
  } = info;

  const onSale = priceAfterDiscount ? priceAfterDiscount < price : false;
  const discountPercentage = onSale
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden group hover:shadow-lg transition hover:translate-y-[-5px] duration-300">
      <div className="relative">
        <Image
          className="w-full h-60 object-contain bg-white"
          src={imageCover}
          alt={title}
          width={300}
          height={240}
        />
        <div className="absolute top-3 left-3">
          {onSale && (
            <span className="bg-red-500 text-white px-2 py-1 rounded">
              -{discountPercentage}%
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <button
            className="bg-white h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm text-gray-600 hover:text-red-500"
            title="Add to wishlist"
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>

          <button className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-emerald-600 shadow-sm transition">
            <FontAwesomeIcon icon={faArrowsRotate} />
          </button>

          <Link
            href={`/products/${_id}`}
            className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-emerald-600 shadow-sm transition"
          >
            <FontAwesomeIcon icon={faEye} />
          </Link>
        </div>
      </div>

      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{category.name}</div>

        <h3 className="font-medium mb-1 cursor-pointer" title={title}>
          <Link href={`/products/${_id}`} className="line-clamp-2">
            {title}
          </Link>
        </h3>

        <div className="flex items-center mb-2">
            <Ratings rating={ratingsAverage}/>
          <span className="text-xs text-gray-500">
            {ratingsAverage} ({ratingsQuantity} {ratingsQuantity === 1 ? "review" : "reviews"})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary-600">
              {priceAfterDiscount || price} EGP
            </span>
            {onSale && (
              <span className="text-sm text-gray-500 line-through ml-2">
                {price} EGP
              </span>
            )}
          </div>
          <button className="h-10 w-10 rounded-full flex items-center justify-center transition bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-70">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </div>
  );
}
