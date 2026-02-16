import ProfileScreen from "@/features/profile/screens/profile.screen";

export default function Profile() {
  return (
    <ProfileScreen>
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Welcome to your Account
        </h2>
        <p className="text-gray-500">
          Select an option from the sidebar to get started.
        </p>
      </div>
    </ProfileScreen>
  );
}
