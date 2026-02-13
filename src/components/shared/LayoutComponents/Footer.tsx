import Image from "next/image";
import Link from "next/link";
import logo from "../../../assets/images/freshcart-logo.svg";
import minLogo from "../../../assets/images/mini-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faPinterest,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
export default function Footer() {
  return (
    <>
      <footer className="py-5 bg-white border-t border-gray-400/20">
        <div className="container grid md:grid-cols-2 gap-6 xl:grid-cols-5 py-8">
          <div className="xl:col-span-2 space-y-3">
            <h1>
              <Link href={"/"}>
                <Image src={logo} alt="fresh cart logo" />
              </Link>
            </h1>
            <p>
              FreshCart is a versatile e-commerce platform offering a wide range
              of products, from clothing to electronics. It provides a
              user-friendly experience for seamless shopping across diverse
              categories.
            </p>
            <ul className="social-media flex items-center gap-4 *:text-gray-500 *:hover:text-primary-600 *:transition-colors *:duration-200">
              <li>
                <Link href={"#"}>
                  <FontAwesomeIcon icon={faFacebookF} />
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  <FontAwesomeIcon icon={faTwitter} />
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  <FontAwesomeIcon icon={faPinterest} />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-xl mb-4">Categories</h2>
            <ul className="space-y-3 *:hover:text-primary-600 *:transition-colors *:duration-200">
              <li>
                <Link href={`#`}>Men's Fashion</Link>
              </li>
              <li>
                <Link href={`#`}>Women's Fashion</Link>
              </li>
              <li>
                <Link href={`#`}>Baby & Toys</Link>
              </li>
              <li>
                <Link href={`#`}>Beauty & Health</Link>
              </li>
              <li>
                <Link href={`#`}>Electronics</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-xl mb-4">Quick Links</h2>
            <ul className="space-y-3 *:hover:text-primary-600 *:transition-colors *:duration-200">
              <li>
                <Link href={`/about`}>About Us</Link>
              </li>
              <li>
                <Link href={`/contact`}>Contact Us</Link>
              </li>
              <li>
                <Link href={`/privacy-policy`}>Privacy Policy</Link>
              </li>
              <li>
                <Link href={`/terms`}>Terms of Service</Link>
              </li>
              <li>
                <Link href={`/shipping-policy`}>Shipping Policy</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-xl mb-4">Customer Service</h2>
            <ul className="space-y-3 *:hover:text-primary-600 *:transition-colors *:duration-200">
              <li>
                <Link href={`/account`}>My Account</Link>
              </li>
              <li>
                <Link href={`/order`}>My Order</Link>
              </li>
              <li>
                <Link href={`/wishlist`}>Wishlist</Link>
              </li>
              <li>
                <Link href={`/returns-and-refunds`}>Return & Refund</Link>
              </li>
              <li>
                <Link href={`/help-center`}>Help Center</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="container flex items-center justify-between py-5 border-t border-gray-400/20">
          <p>
            &copy; {new Date().getFullYear()} FreshCart. All rights reserved.
          </p>
          <Image src={minLogo} alt="mini logo" className="w-6" />
        </div>
      </footer>
    </>
  );
}
