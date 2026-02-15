"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ProfileScreen from "./profile.screen";
import EmptyAddress from "../components/addresses/EmptyAddress";
import { useState } from "react";
import FormAddress from "../components/addresses/FormAddress";
import { useAppSelector } from "@/store/store";
import AddressCard from "../components/addresses/AddressCard";

export default function AddressesScreen() {
  const [showForm, setShowForm] = useState(false);
  const {data, results} = useAppSelector((state) => state.address);
  return (
    <>
      <ProfileScreen>
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
              <p className="text-gray-500 text-sm mt-1">
                Manage your saved delivery addresses
              </p>
            </div>
            <button
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25"
              onClick={() => setShowForm(true)}
            >
              <FontAwesomeIcon icon={faPlus} className="text-sm" />
              Add Address
            </button>
          </div>

          {results === 0 ? (
            <EmptyAddress setShowForm={setShowForm} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.map((address) => (
                <AddressCard key={address._id} address={address} />
              ))}
            </div>
          )}
        </div>
      </ProfileScreen>
      {showForm && <FormAddress setShowForm={setShowForm} />}
    </>
  );
}
