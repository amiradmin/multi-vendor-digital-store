// app/components/CartPage.tsx

import React from "react";

const CartPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold">Your Cart</h1>
      <p className="mt-4">Here’s what you’ve added to your cart.</p>
      {/* Add cart items and buttons to edit or proceed to checkout */}
    </div>
  );
};

export default CartPage;
