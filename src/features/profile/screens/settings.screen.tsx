"use client";

import LayoutProfile from "../components/LayoutProfile/LayoutProfile";
import ProfileInformation from "../components/settings/ProfileInformation";
import ChangePasswordCard from "../components/settings/ChangePasswordCard";

export default function SettingsScreen() {

  return (
    <LayoutProfile>
      <div className="space-y-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
          <p className="text-gray-500 text-sm mt-1">
            Update your profile information and change your password
          </p>
        </div>

        <ProfileInformation />

        <ChangePasswordCard />
      </div>
    </LayoutProfile>
  );
}
