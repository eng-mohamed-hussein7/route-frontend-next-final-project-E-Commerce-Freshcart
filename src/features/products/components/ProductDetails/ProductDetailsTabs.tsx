"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faStar as faStarSolid,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { Product } from "../../types/products.types";
import ProductDetailsContent from "../tabsComponents/ProductDetailsContent";
import ReviewsContent from "../tabsComponents/ReviewsContent";
import ShippingContent from "../tabsComponents/ShippingContent";

const tabs = [
  { id: "details", label: "Product Details", icon: faBox },
  { id: "reviews", label: "Reviews (4)", icon: faStarSolid },
  { id: "shipping", label: "Shipping & Returns", icon: faTruck },
];

export default function ProductDetailsTabs({ info }: { info: Product }) {
  const { description, category, sold, brand, subcategory , ratingsQuantity, ratingsAverage } = info;
  const { name: categoryName } = category;
  const { name: brandName } = brand;
  const subcategoryName = subcategory[0].name;
  const [activeTab, setActiveTab] = useState("details");

  return (
    <section id="product-details-tabs" className="py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto scrollbar-hide">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 ${
                      activeTab === "details"
                      ? "text-primary-600 border-b-2 border-primary-600 bg-primary-50/50"
                      : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                  }`}
                >
                  <FontAwesomeIcon icon={faBox} className="text-sm" />
                  Product Details
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 ${
                      activeTab === "reviews"
                      ? "text-primary-600 border-b-2 border-primary-600 bg-primary-50/50"
                      : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                  }`}
                >
                  <FontAwesomeIcon icon={faStarSolid} className="text-sm" />
                  Reviews ({ratingsQuantity})
                </button>
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 ${
                      activeTab === "shipping"
                      ? "text-primary-600 border-b-2 border-primary-600 bg-primary-50/50"
                      : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                  }`}
                >
                  <FontAwesomeIcon icon={faTruck} className="text-sm" />
                  Shipping & Returns
                </button>
                     
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "details" && (
              <ProductDetailsContent
                description={description}
                categoryName={categoryName}
                brandName={brandName}
                sold={sold}
                subcategoryName={subcategoryName}
              />
            )}
            {activeTab === "reviews" && <ReviewsContent ratingsQuantity={ratingsQuantity} ratingsAverage={ratingsAverage} />}
            {activeTab === "shipping" && <ShippingContent />}
          </div>
        </div>
      </div>
    </section>
  );
}
