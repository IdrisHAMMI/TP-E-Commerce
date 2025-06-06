import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, calculateTotal, clearCart } =
    useCart();
  const [vatRate, setVatRate] = useState(20); // Default to 20%

  const handleQuantityChange = (itemId: number, quantity: number) => {
    updateQuantity(itemId, quantity);
  };

  const handleVatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVatRate(Number(e.target.value));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <div>
            {cart.map((item) => (
              <div key={item.id} className="flex items-center mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-gray-600">${item.price}</p>
                  <div className="flex items-center mt-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, +e.target.value)
                      }
                      className="w-16 p-2 border rounded-md"
                      min={1}
                    />
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div>
              <label className="mr-2">Select VAT Rate:</label>
              <select
                value={vatRate}
                onChange={handleVatChange}
                className="p-2 border rounded-md"
              >
                <option value={20}>20%</option>
                <option value={5}>5%</option>
              </select>
            </div>
            <div className="mt-4">
              <p className="text-xl font-semibold">
                Total: ${calculateTotal(vatRate).toFixed(2)}
              </p>
            </div>
            <div className="mt-4">
              <button
                onClick={clearCart}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
