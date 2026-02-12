"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCartShopping,
  faMinus,
  faPlus,
  faRotateLeft,
  faShareNodes,
  faShieldHalved,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Product } from "../../types/products.types";
import Ratings from "@/components/ui/Ratings";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";

export default function ProductInfo({ info }: { info: Product }) {
  const {
    _id,
    category,
    description,
    images,
    price,
    priceAfterDiscount,
    ratingsAverage,
    ratingsQuantity,
    quantity,
    title,
    brand,
    imageCover,
  } = info;

  const onSale = priceAfterDiscount ? priceAfterDiscount < price : false;
  const isLowStock = quantity > 0 && quantity < 10;
  const displayPrice = onSale ? priceAfterDiscount : price;
  const discountPercent = onSale
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;

  const [qty, setQty] = useState(1);

  const totalPrice = (displayPrice * qty).toFixed(2);

  const handleDecrease = () => setQty((prev) => Math.max(1, prev - 1));
  const handleIncrease = () => setQty((prev) => Math.min(quantity, prev + 1));

  return (
    <section id="product-detail" className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Product Images ── */}
          <div id="product-images" className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
              <ImageGallery items={images.map((image) => {
                return {
                  original: image,
                  thumbnail: image,
                }
              })}
                showPlayButton={false}
                showFullscreenButton={false}
                showNav={false}
                showThumbnails={true}
              />
              
            </div>
          </div>

          {/* ── Product Info ── */}
          <div id="product-info" className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Category & Brand Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Link
                  href={`/categories/${category._id}`}
                  className="bg-primary-50 text-primary-700 text-xs px-3 py-1.5 rounded-full hover:bg-primary-100 transition"
                >
                  {category.name}
                </Link>
                {brand && (
                  <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
                    {brand.name}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                {title}
              </h1>

              {/* Ratings */}
              <div className="flex items-center gap-3 mb-4">
                <Ratings rating={ratingsAverage} />
                <span className="text-sm text-gray-600">
                  {ratingsAverage} ({ratingsQuantity} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center flex-wrap gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {displayPrice} EGP
                </span>
                {onSale && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      {price} EGP
                    </span>
                    <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                      Save {discountPercent}%
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                {quantity > 0 ? (
                  <span
                    className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full ${
                      isLowStock
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-green-50 text-green-700"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isLowStock ? "bg-yellow-500" : "bg-green-500"
                      }`}
                    />
                    {isLowStock ? `Only ${quantity} left` : "In Stock"}
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-red-50 text-red-700">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="border-t border-gray-100 pt-5 mb-6">
                <p className="text-gray-600 leading-relaxed ">
                  {description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                    <button
                      id="decrease-qty"
                      onClick={handleDecrease}
                      disabled={qty <= 1}
                      className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <input
                      min={1}
                      max={quantity}
                      className="w-16 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium"
                      id="quantity"
                      type="number"
                      value={qty}
                      onChange={(e) =>
                        setQty(
                          Math.max(
                            1,
                            Math.min(quantity, Number(e.target.value)),
                          ),
                        )
                      }
                    />
                    <button
                      id="increase-qty"
                      onClick={handleIncrease}
                      disabled={qty >= quantity}
                      className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {quantity} available
                  </span>
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-primary-50/50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Price:</span>
                  <span className="text-2xl font-bold text-primary-600">
                    {totalPrice} EGP
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  id="add-to-cart"
                  className="flex-1 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-primary-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-600/25 bg-primary-600"
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                  Add to Cart
                </button>
                <button
                  id="buy-now"
                  className="flex-1 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faBolt} />
                  Buy Now
                </button>
              </div>

              {/* Wishlist & Share */}
              <div className="flex gap-3 mb-6">
                <button
                  id="wishlist-button"
                  className="flex-1 border-2 py-3 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:border-primary-300 hover:text-primary-600"
                >
                  <FontAwesomeIcon icon={faHeart} />
                  Add to Wishlist
                </button>
                <button className="border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:border-primary-300 hover:text-primary-600 transition">
                  <FontAwesomeIcon icon={faShareNodes} />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="border-t border-gray-100 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center shrink-0">
                      <FontAwesomeIcon icon={faTruckFast} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">
                        Free Delivery
                      </h4>
                      <p className="text-xs text-gray-500">Orders over $50</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center shrink-0">
                      <FontAwesomeIcon icon={faRotateLeft} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">
                        30 Days Return
                      </h4>
                      <p className="text-xs text-gray-500">Money back</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center shrink-0">
                      <FontAwesomeIcon icon={faShieldHalved} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">
                        Secure Payment
                      </h4>
                      <p className="text-xs text-gray-500">100% Protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
