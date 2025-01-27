import React from "react";

const OrderList = ({ status = "all" }) => {
  const orders = [
    {
      id: 1,
      customerName: "John Doe",
      status: "completed",
      date: "2025-01-15",
      items: 3, // Number of items
      total: 150.0, // Total price
      paymentStatus: "Completed",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      status: "need to ship",
      date: "2025-01-17",
      items: 5, // Number of items
      total: 250.0, // Total price
      paymentStatus: "Pending",
    },
    {
      id: 3,
      customerName: "Alice Johnson",
      status: "sent",
      date: "2025-01-18",
      items: 2, // Number of items
      total: 100.0, // Total price
      paymentStatus: "Completed",
    },
    // Add more orders as needed
  ];

  const filteredOrders =
    status === "all"
      ? orders
      : orders.filter((order) => order.status === status);

  return (
    <div className="flex flex-col mt-4">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Items</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Payment Status</th>
              <th className="px-4 py-2 text-left">...</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.customerName}</td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2">{order.date}</td>
                <td className="px-4 py-2">{order.items}</td>
                {/* Display items count */}
                <td className="px-4 py-2">{order.total}</td>
                {/* Display total amount */}
                <td className="px-4 py-2">{order.paymentStatus}</td>
                <td className="px-4 py-2 cursor-pointer">...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
