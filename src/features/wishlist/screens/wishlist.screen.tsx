"use client";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EmptyWishlist from "../components/EmptyWishlist";
import WishlistDetails from "../components/WishlistDetails";
import { useAppSelector } from "@/store/store";

export default function WishlistScreen() {

  const response = useAppSelector((appState) => appState.wishlist);
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs links={[{ href: "/wishlist", label: "Wishlist" }]} />
        {response.count && response.count > 0 ? (
          <>
            <WishlistDetails response={response} />
          </>
        ) : (
          <EmptyWishlist />
        )}
      </div>
    </>
  );
}
