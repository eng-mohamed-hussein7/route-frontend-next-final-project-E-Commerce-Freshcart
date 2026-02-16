"use client";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faEnvelope,
  faHeart,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBabyCarriage,
  faBars,
  faBolt,
  faCartShopping,
  faChevronDown,
  faEllipsis,
  faPerson,
  faPersonDress,
  faPhone,
  faRightFromBracket,
  faSearch,
  faSuitcaseMedical,
  faUserPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../assets/images/freshcart-logo.svg";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AppState as RootState } from "@/store/store";
import useLogout from "@/features/auth/hooks/useLogout";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useSelector(
    (appState: RootState) => appState.auth,
  );
  const { logout } = useLogout();
  const { numOfCartItems } = useSelector(
    (appState: RootState) => appState.cart,
  );
  const { count } = useSelector((appState: RootState) => appState.wishlist);
  return (
    <>
      <header>
        <div className="container">
          {/* Top navbar */}
          <div className="top-navbar hidden lg:flex items-center justify-between mt-3 text-sm pb-2 border-b border-gray-300/30">
            <ul className="flex items-center gap-5">
              <li>
                <div className="size-4">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <a href="tel:+1 (800) 123-4567">+1 (800) 123-4567</a>
              </li>
              <li>
                <div className="size-4">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <a href="mailto:support@freshcart.com">support@freshcart.com</a>
              </li>
            </ul>
            <ul className="flex items-center gap-5">
              <li>
                <Link href={"track-order"}>Track Order</Link>
              </li>
              <li>
                <Link href={"about"}>About</Link>
              </li>
              <li>
                <Link href={"contact"}>Contact</Link>
              </li>
              <li>
                <select name="currency" id="currency">
                  <option value="EGP">EGP</option>
                  <option value="SAR">SAR</option>
                  <option value="AED">AED</option>
                </select>
              </li>
              <li>
                <select name="language" id="language">
                  <option value="ar">العربيه</option>
                  <option value="en">English</option>
                </select>
              </li>
            </ul>
          </div>
          {/* main navigation */}
          <nav className="flex items-center justify-between py-5">
            <h1>
              <Link href={"/"}>
                <Image src={logo} alt="fresh cart logo" />
              </Link>
            </h1>
            <search className="relative hidden lg:block">
              <input
                type="text"
                placeholder="Search for products"
                className="form-control min-w-96"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="size-4 absolute right-2 top-1/2 -translate-y-1/2"
              />
            </search>
            <ul className="hidden lg:flex items-center gap-5">
              <li>
                <Link
                  href={"/wishlist"}
                  className={
                    pathname === "/wishlist"
                      ? "flex flex-col items-center text-primary-600"
                      : "flex flex-col items-center hover:text-primary-600 transition-colors duration-200"
                  }
                >
                  <div className="relative">
                    <FontAwesomeIcon icon={faHeart} className="size-4" />
                    {count !== 0 && (
                      <span className="bg-red-500 text-xs text-white flex items-center justify-center size-5 rounded-full absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
                        {count}
                      </span>
                    )}
                  </div>
                  <span className="text-sm">Wishlist</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/cart"}
                  className={
                    pathname === "/cart"
                      ? "flex flex-col items-center text-primary-600"
                      : "flex flex-col items-center hover:text-primary-600 transition-colors duration-200"
                  }
                >
                  <div className="relative">
                    <FontAwesomeIcon icon={faCartShopping} />
                    {numOfCartItems > 0 && (
                      <span className="bg-primary-600 text-xs text-white flex items-center justify-center size-5 rounded-full absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
                        {numOfCartItems}
                      </span>
                    )}
                  </div>
                  <span className="text-sm">Cart</span>
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      href={"/profile"}
                      className={
                        pathname === "/profile"
                          ? "flex flex-col items-center text-primary-600"
                          : "flex flex-col items-center hover:text-primary-600 transition-colors duration-200"
                      }
                    >
                      <FontAwesomeIcon icon={faUser} className="size-4" />
                      <span className="text-sm">Account</span>
                    </Link>
                  </li>
                  <li
                    className="flex-col gap-0 hover:text-primary-600 transition-colors duration-200 cursor-pointer"
                    onClick={logout}
                  >
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      className="size-4"
                    />
                    <span className="text-sm">Logout</span>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href={"/signup"}
                      className={
                        pathname === "/signup"
                          ? "flex flex-col items-center text-primary-600"
                          : "flex flex-col items-center hover:text-primary-600 transition-colors duration-200"
                      }
                    >
                      <FontAwesomeIcon icon={faUserPlus} className="size-4" />
                      <span className="text-sm">Sign up</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/login"}
                      className={
                        pathname === "/login"
                          ? "flex flex-col items-center text-primary-600"
                          : "flex flex-col items-center hover:text-primary-600 transition-colors duration-200"
                      }
                    >
                      <FontAwesomeIcon
                        icon={faAddressCard}
                        className="size-4"
                      />
                      <span className="text-sm">Login</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <div className="lg:hidden">
              <button
                className="btn bg-primary-600 text-white hover:bg-primary-600/95"
                onClick={() => setIsMenuOpen(true)}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
          </nav>
        </div>
        {/* category navigation */}
        <nav className="hidden lg:block bg-gray-100 py-4">
          <div className="container flex items-center gap-8">
            <div className="relative group">
              <button className="flex items-center gap-3 btn bg-primary-600 text-white hover:bg-primary-600/95">
                <FontAwesomeIcon icon={faBars} />
                <span>All Categories</span>
                <FontAwesomeIcon icon={faChevronDown} />
              </button>

              <menu className="absolute group-hover:block hidden min-w-60 *:px-4 *:py-3 *:hover:bg-gray-100 rounded-lg bg-white shadow-lg divide-y-2 divide-gray-300/20 z-50">
                <li>
                  <Link href={"#"} className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faPerson}
                      className="text-primary-600 text-xl"
                    />
                    <span>Men's Fashion</span>
                  </Link>
                </li>
                <li>
                  <Link href={"#"} className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faPersonDress}
                      className="text-primary-600 text-xl"
                    />
                    <span>Woman's Fashion</span>
                  </Link>
                </li>
                <li>
                  <Link href={"#"} className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faBabyCarriage}
                      className="text-primary-600 text-xl"
                    />
                    <span>Baby & Toys</span>
                  </Link>
                </li>
                <li>
                  <Link href={"#"} className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faSuitcaseMedical}
                      className="text-primary-600 text-xl"
                    />
                    <span>Beauty & Health</span>
                  </Link>
                </li>
                <li>
                  <Link href={"#"} className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faBolt}
                      className="text-primary-600 text-xl"
                    />
                    <span>Electronics</span>
                  </Link>
                </li>
                <li>
                  <Link href={"#"} className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faEllipsis}
                      className="text-primary-600 text-xl"
                    />
                    <span>View All Categories</span>
                  </Link>
                </li>
              </menu>
            </div>
            <ul className="flex items-center gap-5">
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/recently-added"}>Recently Added</Link>
              </li>
              <li>
                <Link href={"/featured-products"}>Featured Products</Link>
              </li>
              <li>
                <Link href={"/offers"}>Offers</Link>
              </li>
              <li>
                <Link href={"/brands"}>Brands</Link>
              </li>
            </ul>
          </div>
        </nav>
        {isMenuOpen && (
          <>
            {/* offCanvas */}
            <div
              className="background fixed inset-0 z-30 bg-black/50 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            ></div>
            <div className="offCanvas fixed top-0 bottom-0 bg-white z-50 p-5 space-y-5 animate-slide-in">
              <div className="flex items-center justify-between border-b-2 border-gray-300/50 pb-5">
                <Link href={"/"}>
                  <Image src={logo} alt="fresh cart logo" />
                </Link>
                <button
                  className="btn rounded-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
              <search className="relative">
                <input
                  type="text"
                  placeholder="Search for products"
                  className="form-control min-w-64"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="size-4 absolute right-2 top-1/2 -translate-y-1/2"
                />
              </search>
              <div>
                <h2 className="text-xl font-semibold">Main Menu</h2>
                <ul className="space-y-2 mt-3 *:hover:bg-gray-100 duration-200 transition-colors ">
                  <li>
                    <Link
                      href={"/wishlist"}
                      className={`flex items-center  py-3 px-2 w-full rounded-md gap-2 ${pathname === "/wishlist" ? "text-primary-600 bg-primary-100" : ""}`}
                    >
                      <div className="relative">
                        <FontAwesomeIcon icon={faHeart} className="size-4" />
                        {count !== 0 && (
                          <span className="bg-red-500 text-xs text-white flex items-center justify-center size-5 rounded-full absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
                            {count}
                          </span>
                        )}
                      </div>
                      <span className="text-sm">Wishlist</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/cart"}
                      className={`flex items-center  py-3 px-2 w-full rounded-md gap-2 ${pathname === "/cart" ? "text-primary-600 bg-primary-100" : ""}`}
                    >
                      <div className="relative">
                        <FontAwesomeIcon icon={faCartShopping} />
                        {numOfCartItems > 0 && (
                          <span className="bg-primary-600 text-xs text-white flex items-center justify-center size-5 rounded-full absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
                            {numOfCartItems}
                          </span>
                        )}
                      </div>
                      <span className="text-sm">Cart</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={"/profile"}
                      className={`flex items-center  py-3 px-2 w-full rounded-md gap-2 ${pathname === "/profile" ? "text-primary-600 bg-primary-100" : ""}`}
                    >
                      <FontAwesomeIcon icon={faUser} className="size-4" />
                      <span className="text-sm">Account</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="border-t-2 border-gray-300/50 pt-5">
                <h2 className="text-xl font-semibold">Account</h2>
                <ul className="space-y-2 mt-3 *:hover:bg-gray-100 duration-200 transition-colors ">
                  {isAuthenticated ? (
                    <>
                      <li
                        className="gap-2 cursor-pointer py-3 px-2 w-full rounded-md"
                        onClick={logout}
                      >
                        <FontAwesomeIcon
                          icon={faRightFromBracket}
                          className="size-4"
                        />
                        <span className="text-sm">Logout</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          href={"/signup"}
                          className={`flex items-center  py-3 px-2 w-full rounded-md gap-2 ${pathname === "/signup" ? "text-primary-600 bg-primary-100" : ""}`}
                        >
                          <FontAwesomeIcon
                            icon={faUserPlus}
                            className="size-4"
                          />
                          <span className="text-sm">Sign up</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/login"}
                          className={`flex items-center  py-3 px-2 w-full rounded-md gap-2 ${pathname === "/login" ? "text-primary-600 bg-primary-100" : ""}`}
                        >
                          <FontAwesomeIcon
                            icon={faAddressCard}
                            className="size-4"
                          />
                          <span className="text-sm">Login</span>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}
