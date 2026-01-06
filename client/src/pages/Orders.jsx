import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="p-6">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return <p className="p-6">No orders found</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded p-4 mb-4 shadow"
        >
          <div className="flex justify-between mb-2">
            <span>
              <strong>Order ID:</strong> {order._id}
            </span>
            <span>
              <strong>Total:</strong> ₹{order.totalPrice}
            </span>
          </div>

          <div className="mb-2">
            <strong>Status:</strong>{" "}
            {order.isDelivered ? "Delivered" : "Processing"}
          </div>

          <div>
            <strong>Items:</strong>
            {order.orderItems.map((item, idx) => (
              <div key={idx} className="ml-4 text-sm">
                • {item.name} × {item.qty}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
