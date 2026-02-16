import {
  faLocationDot,
  faPhone,
  faCity,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Address } from "../../types/address.types";
import { useAppDispatch } from "@/store/store";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { removeAddress } from "../../store/address.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteAddress } from "../../server/address.actions";
import FormAddress from "./FormAddress";
import { useState } from "react";

export default function AddressCard({ address }: { address: Address }) {
  const dispatch = useAppDispatch();
  const handleDeleteAddress = async () => {
    const result = await Swal.fire({
      html: `
      <div class="text-center py-2">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Remove Address?</h3>
        <p class="text-gray-500 text-sm leading-relaxed">
          Remove <span class="font-semibold text-gray-700">${address.name.slice(0, 40)}${address.name.length > 40 ? "..." : ""}</span> from your addresses?
        </p>
      </div>`,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Yes, Remove it!",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        popup: "rounded-2xl shadow-2xl border-0 p-0",
        htmlContainer: "p-6 m-0",
        actions: "px-6 pb-6 pt-0 flex-row-reverse gap-3",
        confirmButton:
          "bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200",
        cancelButton:
          "bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-colors duration-200",
      },
    });
    if (result.isConfirmed) {
     try {
      const response = await deleteAddress(address._id);
      if (response.status === "success") {
        dispatch(removeAddress({ addressId: address._id }));
        toast.success("Address removed successfully");
      }
     } catch (error) {
      toast.error("Failed to remove address");
     }
    }
  };

  const [showForm, setShowForm] = useState(false);

  return (
    <>
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-primary-100 transition-all duration-200 group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="text-lg text-primary-600"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 mb-1">{address.name}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {address.details}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <FontAwesomeIcon icon={faPhone} className="text-xs" />
                {address.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <FontAwesomeIcon icon={faCity} className="text-xs" />
                {address.city}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600 flex items-center justify-center transition-colors" onClick={() => setShowForm(true)}>
            <FontAwesomeIcon icon={faPen} className="text-sm" />
          </button>
          <button
            className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors"
            onClick={handleDeleteAddress}
          >
            <FontAwesomeIcon icon={faTrash} className="text-sm" />
          </button>
        </div>
      </div>
    </div>
    {showForm && <FormAddress setShowForm={setShowForm} address={address} />}
    </>
  );
}
