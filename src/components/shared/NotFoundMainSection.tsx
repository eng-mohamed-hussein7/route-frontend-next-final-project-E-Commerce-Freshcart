import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faPhone,
  faEnvelope,
  faComment,
  faCartShopping,
  faAppleWhole,
  faEgg,
  faCookieBite,
  faFish,
} from "@fortawesome/free-solid-svg-icons";

const categories = [
  { icon: faAppleWhole, label: "Fruits & Vegetables", href: "/categories" },
  { icon: faEgg, label: "Dairy & Eggs", href: "/categories" },
  { icon: faCookieBite, label: "Bakery & Snacks", href: "/categories" },
  { icon: faFish, label: "Meat & Seafood", href: "/categories" },
];

export default function NotFoundMainSection() {
  return (
    <section id="not-found" className="py-20 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Hero */}
          <div className="mb-8 relative">
            <span className="text-[10rem] sm:text-[12rem] font-black text-primary-100 leading-none select-none flex items-center justify-center">
              4
              <FontAwesomeIcon
                icon={faCartShopping}
                className="text-primary-600 text-7xl sm:text-8xl mx-1 -translate-y-2"
              />
              4
            </span>
          </div>

          {/* Message */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Oops! Page Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              The page you&apos;re looking for seems to have gone shopping!
            </p>
            <p className="text-gray-500">
              Don&apos;t worry, our fresh products are still available for you.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faHouse} className="size-4" />
              Back to Home
            </Link>
            <Link
              href="/search"
              className="border border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="size-4" />
              Search Products
            </Link>
          </div>

          {/* Popular Categories */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-700 mb-6">
              Or explore our popular categories
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.label}
                  href={category.href}
                  className="group border border-gray-200 bg-white rounded-xl p-5 flex flex-col items-center gap-3 hover:border-primary-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="size-12 rounded-full bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors duration-200">
                    <FontAwesomeIcon
                      icon={category.icon}
                      className="text-primary-600 text-lg"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors duration-200">
                    {category.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Need Help */}
          <div className="bg-primary-50 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Need Help?
            </h3>
            <p className="text-gray-600 mb-6">
              Our customer support team is here to assist you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18001234567"
                className="flex items-center justify-center gap-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-primary-600 size-4"
                />
                +1 (800) 123-4567
              </a>
              <a
                href="mailto:support@freshcart.com"
                className="flex items-center justify-center gap-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-primary-600 size-4"
                />
                support@freshcart.com
              </a>
              <span className="flex items-center justify-center gap-2 text-gray-700">
                <FontAwesomeIcon
                  icon={faComment}
                  className="text-primary-600 size-4"
                />
                Live Chat
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
