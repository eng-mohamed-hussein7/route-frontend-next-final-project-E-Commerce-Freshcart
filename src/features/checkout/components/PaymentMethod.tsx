import { faCheck, faCreditCard, faMoneyBill, faShieldHalved, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

interface PaymentMethodProps {
  paymentMethod: "cash" | "card";
  setPaymentMethod: (paymentMethod: "cash" | "card") => void;
}

export default function PaymentMethod({ paymentMethod, setPaymentMethod }: PaymentMethodProps) {
  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FontAwesomeIcon icon={faWallet} />
            Payment Method
          </h2>
          <p className="text-primary-100 text-sm mt-1">
            Choose how you'd like to pay
          </p>
        </div>

        <div className="p-6 space-y-4">
          <button
            type="button"
            className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${paymentMethod === "cash" ? "border-primary-500 bg-gradient-to-r from-primary-50 to-emerald-50 shadow-sm" : "border-gray-200 hover:border-primary-200 hover:bg-gray-50"}`}
            onClick={() => setPaymentMethod("cash")}
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${paymentMethod === "cash" ? "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"}`}>
              <FontAwesomeIcon icon={faMoneyBill} className="text-xl" />
            </div>
            <div className="flex-1 text-left">
              <h3 className={`font-bold ${paymentMethod === "cash" ? "text-primary-700" : "text-gray-900"}`}>Cash on Delivery</h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Pay when your order arrives at your doorstep
              </p>
            </div>
           {paymentMethod == "cash" ? (
             <div className="w-7 h-7 rounded-full flex items-center justify-center transition-all bg-primary-600 text-white">
               <FontAwesomeIcon icon={faCheck} className="text-xs" />
             </div>
           ) : (
             <div className="w-7 h-7 rounded-full flex items-center justify-center transition-all border-2 border-gray-200" />
           )}
          </button>

          <button
            type="button"
            className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${paymentMethod === "card" ? "border-primary-500 bg-gradient-to-r from-primary-50 to-emerald-50 shadow-sm" : "border-gray-200 hover:border-primary-200 hover:bg-gray-50"}`}
            onClick={() => setPaymentMethod("card")}
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${paymentMethod === "card" ? "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"}`}>
              <FontAwesomeIcon icon={faCreditCard} className="text-xl" />
            </div>
            <div className="flex-1 text-left">
              <h3 className={`font-bold ${paymentMethod === "card" ? "text-primary-700" : "text-gray-900"}`}>Pay Online</h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Secure payment with Credit/Debit Card via Stripe
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Image
                  alt="Visa"
                  className="h-5 w-auto"
                  src="https://img.icons8.com/color/48/visa.png"
                  width={48}
                  height={20}
                />
                <Image
                  alt="Mastercard"
                  className="h-5 w-auto"
                  src="https://img.icons8.com/color/48/mastercard.png"
                  width={48}
                  height={20}
                />
                <Image
                  alt="Amex"
                  className="h-5 w-auto"
                  src="https://img.icons8.com/color/48/amex.png"
                  width={48}
                  height={20}
                />
              </div>
            </div>
            {paymentMethod == "card" ? (
              <div className="w-7 h-7 rounded-full flex items-center justify-center transition-all bg-primary-600 text-white">
                <FontAwesomeIcon icon={faCheck} className="text-xs" />
              </div>
            ) : (
              <div className="w-7 h-7 rounded-full flex items-center justify-center transition-all border-2 border-gray-200" />
            )}
          </button>

          {/* Secure & Encrypted Info */}
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mt-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <FontAwesomeIcon
                icon={faShieldHalved}
                className="text-green-600"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">
                Secure &amp; Encrypted
              </p>
              <p className="text-xs text-green-600 mt-0.5">
                Your payment info is protected with 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
