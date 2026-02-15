import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddressInput, addressSchema } from "../../schemas/address.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAddress } from "../../server/address.actions";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store/store";
import { addAddress as addAddressToStore } from "../../store/address.slice";

export default function FormAddress({ setShowForm }: { setShowForm: (showForm: boolean) => void }) {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<AddressInput>({
  defaultValues: {
    name: "",
    details: "",
    phone: "",
    city: "",
  },
  resolver: zodResolver(addressSchema),
  mode: "onSubmit",
  reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<AddressInput> = async (data) => {
    try {
      const response = await addAddress(data);
      if (response.status === "success") {
        toast.success(response.message);
        setShowForm(false);
        dispatch(addAddressToStore(response));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add New Address</h2>
          <button className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center transition-colors" onClick={() => setShowForm(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address Name
            </label>
            <input
              placeholder="e.g. Home, Office"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              {...register("name")}
              type="text"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Address
            </label>
            <textarea
              placeholder="Street, building, apartment..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
              {...register("details")}
            />
            {errors.details && <p className="text-red-500 text-sm">{errors.details.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                placeholder="01xxxxxxxxx"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                {...register("phone")}
                type="tel"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                placeholder="Cairo"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                {...register("city")}
                type="text"
              />
              {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              className="flex-1 py-3 px-6 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-6 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 shadow-lg shadow-primary-600/25"
            >
              Add Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
