"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import homeImage from "../../../assets/images/home-slider-1.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
export default function HomeSlider() {
  return (
    <>
      <section className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 5000,
          }}
        >
          <SwiperSlide>
            <div
              style={{
                backgroundImage: `url(${homeImage.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="h-100 flex items-center justify-center"
            >
              <div className="overlay py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50">
                <div className="container h-full content-center">
                  <h2 className="text-white text-3xl font-bold mb-4 max-w-96">
                    Fresh Products Delivered to your Door
                  </h2>
                  <p>Get 20% off your first order</p>
                  <div className="mt-4">
                    <Link
                      href={`/products`}
                      className="btn bg-white border-2 border-white/50 text-green-500"
                    >
                      Shop Now
                    </Link>
                    <Link
                      href={`/deals`}
                      className="btn bg-transparent border-2 border-white/50 text-white ml-2"
                    >
                      View Deals
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              style={{
                backgroundImage: `url(${homeImage.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="h-100 flex items-center justify-center"
            >
              <div className="overlay py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50">
                <div className="container h-full content-center">
                  <h2 className="text-white text-3xl font-bold mb-4 max-w-96">
                    Fresh Products Delivered to your Door
                  </h2>
                  <p>Get 20% off your first order</p>
                  <div className="mt-4">
                    <Link
                      href={`/products`}
                      className="btn bg-white border-2 border-white/50 text-green-500"
                    >
                      Shop Now
                    </Link>
                    <Link
                      href={`/deals`}
                      className="btn bg-transparent border-2 border-white/50 text-white ml-2"
                    >
                      View Deals
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              style={{
                backgroundImage: `url(${homeImage.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="h-100 flex items-center justify-center"
            >
              <div className="overlay py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50">
                <div className="container h-full content-center">
                  <h2 className="text-white text-3xl font-bold mb-4 max-w-96">
                    Fresh Products Delivered to your Door
                  </h2>
                  <p>Get 20% off your first order</p>
                  <div className="mt-4">
                    <Link
                      href={`/products`}
                      className="btn bg-white border-2 border-white/50 text-green-500"
                    >
                      Shop Now
                    </Link>
                    <Link
                      href={`/deals`}
                      className="btn bg-transparent border-2 border-white/50 text-white ml-2"
                    >
                      View Deals
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white rounded-full p-2 ">
          <FontAwesomeIcon icon={faChevronLeft} className="text-lg" />
        </button>
        <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white rounded-full p-2 ">
          <FontAwesomeIcon icon={faChevronRight} className="text-lg" />
        </button>
      </section>
    </>
  );
}
