import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLocationDot,
  faGear,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import LayoutProfile from "../components/LayoutProfile/LayoutProfile";

export default function ProfileScreen() {
  return (
   <LayoutProfile>
    <div className="text-center py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Welcome to your Account
        </h2>
        <p className="text-gray-500">
          Select an option from the sidebar to get started.
        </p>
        <p>go to <Link href="/allorders" className="text-primary-600 font-bold underline hover:text-primary-700 transition-colors duration-200">orders</Link></p>
      </div>
   </LayoutProfile>
  );
}
