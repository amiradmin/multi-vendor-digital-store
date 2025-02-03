"use client"; // This is required for hooks in the App Router

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "./../../utils/api";

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage: ", token);

      if (!token) {
        setError("You must be logged in to view your profile.");
        router.push("/auth/login"); // Redirect to login if no token
        return;
      }

      try {
        const response = await api.get("auth/profile/", {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        console.log("API Response Data: ", response.data);
        setUserData(response.data);
      } catch (err: any) {
        console.error("API Error:", err);
        if (err.response) {
          console.error("API Response Error:", err.response.data);
          // Display server error message
          setError(`Failed to fetch profile data: ${err.response.data.detail || 'Unknown error'}`);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-xl">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800">Your Profile</h2>
        <div className="space-y-4">
          <div className="flex justify-center">
            <img
              src={userData.avatar || "/static/images/my_project/default_avatar.png"}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-4 border-indigo-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="text-gray-800">{userData.username}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="text-gray-800">{userData.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <p className="text-gray-800">{userData.address || "Not provided"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <p className="text-gray-800">{userData.phone_number || "Not provided"}</p>
          </div>
          <div>
            <button
              onClick={() => router.push("/auth/edit-profile")}
              className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

