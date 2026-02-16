import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "@/store/store";

export default function ProfileInformation() {
  const { userInfo } = useAppSelector((state) => state.auth);
  return (
    <>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faUser}
                className="text-2xl text-primary-600"
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Profile Information</h3>
              <p className="text-sm text-gray-500">
                Update your personal details
              </p>
            </div>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                required
                type="text"
                defaultValue={userInfo?.name}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                required
                type="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                placeholder="01xxxxxxxxx"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                required
                type="tel"
              />
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 shadow-lg shadow-primary-600/25"
              >
                <FontAwesomeIcon icon={faFloppyDisk} />
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Account Information */}
        <div className="p-6 sm:p-8 bg-gray-50">
          <h3 className="font-bold text-gray-900 mb-4">Account Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">User ID</span>
              <span className="font-mono text-gray-700">{userInfo?.id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Role</span>
              <span className="px-3 py-1 rounded-lg bg-primary-100 text-primary-700 font-medium capitalize">
                {userInfo?.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
