"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "./../../utils/api";

const NewProductPage = () => {
  const [vendor, setVendor] = useState(0);
  const [vendors, setVendors] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // Fetch vendors when the component mounts
  useEffect(() => {
    const fetchVendors = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to view vendors.");
        router.push("/auth/login");
        return;
      }

      try {
        const response = await api.get("/vendors/list/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVendors(response.data);
      } catch (err) {
        setError("Failed to fetch vendors.");
        console.error(err);
      }
    };

    fetchVendors();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to create a product.");
      setLoading(false);
      return;
    }

    try {
      // Create FormData object
      const formData = new FormData();
      formData.append("vendor", vendor.toString());
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      if (image) formData.append("image", image);
      if (file) formData.append("file", file);

      // Send the request
      const response = await api.post("products/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Product created successfully!");
      setTimeout(() => router.push("/"), 1500);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create New Product</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Vendor</label>
          <select
            value={vendor}
            onChange={(e) => setVendor(Number(e.target.value))}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">Select Vendor</option>
            {vendors.map((vendorItem) => (
              <option key={vendorItem.id} value={vendorItem.id}>
                {vendorItem.store_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Product File</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default NewProductPage;
