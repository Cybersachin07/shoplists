import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <img
        src="https://via.placeholder.com/300x200"
        alt={product.name}
        className="w-full h-40 object-cover mb-3"
      />

      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2">
        {product.description}
      </p>

      <div className="flex justify-between items-center">
        <span className="font-bold text-blue-600">
          ₹{product.price}
        </span>

        <button
          onClick={() => addToCart(product)}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
