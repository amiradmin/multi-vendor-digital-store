"use client";

import { useState, useEffect } from "react";
import api from "../utils/api"; // Adjust path based on your project structure
import { useRouter } from "next/navigation"; // Correct hook for app router

interface CartItem {
  id: number;
  name: string;
  price: number | string;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter(); // Correct hook for app router

  // Fetch cart items from local storage (or API if needed)
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Function to remove an item from the cart
  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => {
    const price = Number(item.price);
    if (!isNaN(price)) {
      return sum + price * item.quantity;
    }
    return sum;
  }, 0);

  // Handle the checkout
  const handleCheckout = async () => {
    const orderData = {
      items: cart.map(item => ({
        product: item.id,
        quantity: item.quantity,
        total_price: Number(item.price) * item.quantity,
      })),
    };

    try {
      // Get the token from localStorage (or other secure storage)
      const token = localStorage.getItem("token"); // Adjust this if needed

      if (!token) {
        alert("You must be logged in to proceed to checkout.");
        return;
      }

      // Make an API call to create the order, passing the token in the Authorization header
      const response = await api.post("/orders/", orderData, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token in the header
        },
      });

      if (response.status === 201) {
        // Redirect to order confirmation or order details page
        router.push(`/order/${response.data.id}`);
      } else {
        // Handle error (show message to user)
        alert("Error creating the order. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("There was an error processing your order. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center border-b py-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">${Number(item.price).toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <p className="text-gray-600 mx-4">Qty: {item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between text-xl font-semibold mt-6">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
