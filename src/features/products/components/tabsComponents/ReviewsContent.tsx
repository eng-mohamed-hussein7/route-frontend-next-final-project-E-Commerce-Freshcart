import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faStar as faStarSolid,
  faTruck,
  faRotateLeft,
  faCheck,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { Product } from "../../types/products.types";
import Ratings from "@/components/ui/Ratings";

export default function ReviewsContent({
  ratingsQuantity,
  ratingsAverage,
}: {
  ratingsQuantity: number;
  ratingsAverage: number;
}) {
  const ratings = [
    { stars: 5, percent: 5 },
    { stars: 4, percent: 25 },
    { stars: 3, percent: 60 },
    { stars: 2, percent: 25 },
    { stars: 1, percent: 5 },
  ];

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-900 mb-2">
            {ratingsAverage}
          </div>
          <Ratings rating={ratingsAverage} />
          <p className="text-sm text-gray-500 mt-2">
            Based on {ratingsQuantity} reviews
          </p>
        </div>

        {/* Rating Bars */}
        <div className="flex-1 w-full">
          {ratings.map((rating) => (
            <div key={rating.stars} className="flex items-center gap-3 mb-2">
              <span className="text-sm text-gray-600 w-8">
                {rating.stars} star
              </span>
              <div className="bar rounded-full overflow-hidden w-full h-2 bg-gray-200">
                <div
                  className="progress bg-yellow-500 h-full"
                  style={{ width: `${rating.percent}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-500 w-10">
                {rating.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Write a Review CTA */}
      <div className="border-t border-gray-200 pt-6">
        <div className="text-center py-8">
          <FontAwesomeIcon
            icon={faStarSolid}
            className="text-4xl text-gray-300 mb-3"
          />
          <p className="text-gray-500">
            Customer reviews will be displayed here.
          </p>
          <button className="mt-4 text-primary-600 hover:text-primary-700 font-medium">
            Write a Review
          </button>
        </div>
      </div>
    </div>
  );
}
