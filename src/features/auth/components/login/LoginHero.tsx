import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faShieldHalved,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import freshGroceries from "../../../../assets/images/fresh-groceries.png"
export default function LoginHero() {
  return (
    <section className=" text-center">
      {/* Hero Image */}
      <div className="mb-8">
        <Image
          src={freshGroceries}
          alt="Fresh Groceries"
          width={400}
          height={300}
          className="mx-auto"
          priority
        />
      </div>

      {/* Hero Text */}
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
        Fresh Groceries Delivered
      </h1>
      <p className="text-gray-600 mb-8">
        Join thousands of happy customers who trust FreshCart for their daily
        grocery needs
      </p>

      {/* Features */}
      <div className="flex justify-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faTruck}
            className="text-primary-500 text-lg"
          />
          <span>Free Delivery</span>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faShieldHalved}
            className="text-primary-500 text-lg"
          />
          <span>Secure Payment</span>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faHeadset}
            className="text-primary-500 text-lg"
          />
          <span>24/7 Support</span>
        </div>
      </div>
    </section>
  );
}
