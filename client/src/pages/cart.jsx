import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border-b py-4"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>₹{item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) =>
                    updateQty(item._id, Number(e.target.value))
                  }
                  className="w-16 border p-1"
                />

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Cart summary */}
          <div className="mt-6 text-right">
            <h2 className="text-xl font-bold mb-4">
              Total: ₹{totalPrice}
            </h2>

            <button
              onClick={() => navigate("/checkout")}
              className="bg-green-600 text-white px-6 py-2 rounded"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
