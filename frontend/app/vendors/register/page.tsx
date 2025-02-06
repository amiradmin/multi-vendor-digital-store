"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "./../../utils/api"; // Importing API instance

const RegisterVendor = () => {
  const [storeName, setStoreName] = useState("");
  const [bio, setBio] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("store_name", storeName);
    formData.append("bio", bio);
    if (logo) formData.append("logo", logo);
    formData.append("website_url", websiteUrl);

    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Unauthorized: Missing token");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      };

      const response = await api.post("/vendors/register/", formData, config);

      setSuccess(response.data.message || "Vendor registration successful!");

      // Redirect after a short delay
      setTimeout(() => router.push("/"), 2000);
    } catch (err: any) {
      console.error("Registration Error:", err);
      setError(err.response?.data?.error || "Failed to register as a vendor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register as a Vendor</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Store Name</label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Logo</label>
          <input
            type="file"
            onChange={(e) => setLogo(e.target.files ? e.target.files[0] : null)}
            className="w-full p-2 border rounded-lg"
            accept="image/*"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Website URL</label>
          <input
            type="url"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterVendor;
