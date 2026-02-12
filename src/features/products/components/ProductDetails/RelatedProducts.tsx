"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductsResponse } from "../../types/products.types";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "../ProductCard";

export default function RelatedProducts({
  relatedProductsResponse,
}: {
  relatedProductsResponse: ProductsResponse;
}) {
  return (
    <>
      <section>
        <div className="container mx-auto px-4 my-12">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-800">
                You May Also <span className="text-emerald-600">Like</span>
              </h2>
            </div>
            <div className="flex space-x-2 relative">
              <button className="swiper-button-prev h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primar">
                <FontAwesomeIcon icon={faChevronLeft} />
                <span className="sr-only">Previous</span>
              </button>
              <button className="swiper-button-next h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primar">
                <FontAwesomeIcon icon={faChevronRight} />
                <span className="sr-only">Next</span>
              </button>
            </div>
          </div>
          <Swiper
            slidesPerView={5}
            spaceBetween={15}
            modules={[Navigation]}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            className="!px-4"
          >
            {relatedProductsResponse.data.map((product) => (
              <SwiperSlide>
                <ProductCard info={product} key={product.id} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
