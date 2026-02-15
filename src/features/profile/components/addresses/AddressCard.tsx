import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faCity,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Address } from "../../types/address.types";

export default function AddressCard({ address }: { address: Address }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-primary-100 transition-all duration-200 group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors">
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
          <button
            className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600 flex items-center justify-center transition-colors"
            title="Edit address"
          >
            <FontAwesomeIcon icon={faPen} className="text-sm" />
          </button>
          <button
            className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors disabled:opacity-50"
            title="Delete address"
          >
            <FontAwesomeIcon icon={faTrash} className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}
