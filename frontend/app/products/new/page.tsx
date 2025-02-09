"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "./../../utils/api";

const NewProductPage = () => {
  const [vendor, setVendor] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Basic price validation
    if (isNaN(Number(price)) || Number(price) <= 0) {
      setError("Please enter a valid price.");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to create a product.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/products/create/", {
        vendor,
        name,
        description,
        price,
      }, {
        headers: {
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
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Vendor ID</label>
          <input
            type="number"
            value={vendor}
            onChange={(e) => setVendor(Number(e.target.value))}
            className="w-full p-2 border rounded-lg"
            required
          />
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
