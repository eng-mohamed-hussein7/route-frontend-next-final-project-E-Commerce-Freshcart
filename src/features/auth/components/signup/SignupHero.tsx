import {
  faShieldHalved,
  faStar,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import reviewAuthor from "../../../assets/images/review-author.png";

export default function SignupHero() {
  return (
    <>
      <section className="Hero-Section space-y-8 py-10">
        <div>
          <h2 className="text-4xl font-bold">
            Welcome to <span className="text-primary-600">FreshCart</span>
          </h2>
          <p className="text-lg mt-2">
            Join thousands of happy customers who enjoy fresh groceries
            delivered right to their doorstep.
          </p>
        </div>

        <ul className="*:gap-3 space-y-5">
          <li>
            <div className="icon size-12 rounded-full flex items-center justify-center bg-primary-200 text-xl text-primary-600">
              <FontAwesomeIcon icon={faStar} />
            </div>
            <div className="content">
              <h3 className="font-semibold">Premium Quality</h3>
              <p className="text-gray-600">
                Premium quality products sourced from trusted suppliers.
              </p>
            </div>
          </li>
          <li>
            <div className="icon size-12 rounded-full flex items-center justify-center bg-primary-200 text-xl text-primary-600">
              <FontAwesomeIcon icon={faTruckFast} />
            </div>
            <div className="content">
              <h3 className="font-semibold">Fast Delivery</h3>
              <p className="text-gray-600">
                Same-day delivery available in most areas
              </p>
            </div>
          </li>
          <li>
            <div className="icon size-12 rounded-full flex items-center justify-center bg-primary-200 text-xl text-primary-600">
              <FontAwesomeIcon icon={faShieldHalved} />
            </div>
            <div className="content">
              <h3 className="font-semibold">Secure Shopping</h3>
              <p className="text-gray-600">
                Your data and payments are completely secure
              </p>
            </div>
          </li>
        </ul>

        <div className="review bg-white shadow-lg p-6 rounded-lg">
          <div className="person flex items-center gap-3">
            <Image
              src={reviewAuthor}
              alt="review author"
              className="size-12 rounded-full"
            />
            <div>
              <h3>Sarah Johnson</h3>
              <div className="rating">
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
              </div>
            </div>
          </div>
          <blockquote>
            <p className="text-gray-700 italic mt-4">
              "FreshCart has transformed my shopping experience. The quality of
              the products is outstanding, and the delivery is always on time.
              Highly recommend!"
            </p>
          </blockquote>
        </div>
      </section>
    </>
  );
}
