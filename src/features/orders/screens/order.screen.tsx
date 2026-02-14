import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faBagShopping } from "@fortawesome/free-solid-svg-icons";
import OrderCard from "../components/OrderCard";
import { getOrders } from "../server/order.actions";
import EmptyOrder from "../components/EmptyOrder";

export default async function OrderScreen() {
  const response = await getOrders();

  return (
    <div className="container mx-auto px-4 py-8">

      {response === null ? (
        <EmptyOrder />
      ) : (
        <>
        <Breadcrumbs links={[{ href: "/allorders", label: "My Orders" }]} />
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
                  <FontAwesomeIcon
                    icon={faBox}
                    className="text-2xl text-white"
                  />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    My Orders
                  </h1>
                  <p className="text-gray-500 text-sm mt-0.5">
                    Track and manage your 1 order
                  </p>
                </div>
              </div>

              <Link
                href="/"
                className="self-start sm:self-auto text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-primary-50 transition-all text-sm"
              >
                <FontAwesomeIcon icon={faBagShopping} className="text-xs" />
                Continue Shopping
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {response.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
