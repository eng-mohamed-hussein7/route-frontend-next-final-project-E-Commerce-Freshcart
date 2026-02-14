import { faBoxOpen, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function EmptyOrder() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-sm text-center">
        <div className="relative mb-4">
          <div className="w-26 h-26 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto text-4xl">
            <FontAwesomeIcon icon={faBoxOpen} className="text-gray-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">No orders yet</h2>
        <p className="text-gray-500 mb-4 leading-relaxed">
          When you place orders, they'll appear here
          <br />
          so you can track them.
        </p>
        <Link
          className="inline-flex items-center gap-2 bg-primary-600 text-white py-3.5 px-8 rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-lg active:scale-[0.98]"
          href="/"
        >
          <FontAwesomeIcon icon={faShoppingBag} />
          Start Shopping 
        </Link>
      </div>
    </div>
  );
}
