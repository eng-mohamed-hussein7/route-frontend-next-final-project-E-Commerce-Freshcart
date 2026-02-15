import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLocationDot,
  faGear,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function ProfileScreen({children}: {children: React.ReactNode}) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
        <div className="container mx-auto px-4 py-10 sm:py-12">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link
              className="hover:text-white transition-colors duration-200"
              href="/"
            >
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">My Account</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <FontAwesomeIcon icon={faUser} className="text-3xl" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                My Account
              </h1>
              <p className="text-white/80 mt-1">
                Manage your addresses and account settings
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <aside className="w-full lg:w-72 shrink-0">
            <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">My Account</h2>
              </div>
              <ul className="p-2">
                <li>
                  <Link
                    className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 group bg-primary-50 text-primary-700 w-full"
                    href="/profile/addresses"
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors bg-primary-500 text-white">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="text-sm"
                      />
                    </div>
                      <span className="font-medium flex-1">My Addresses</span>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="text-xs transition-transform text-primary-500"
                      />
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full"
                    href="/profile/settings"
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors bg-gray-100 text-gray-500 group-hover:bg-gray-200">
                      <FontAwesomeIcon icon={faGear} className="text-sm" />
                    </div>
                    <span className="font-medium flex-1">Settings</span>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="text-xs transition-transform text-gray-400"
                    />
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>

          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
