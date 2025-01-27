import React from "react";

const OrderFilter = ({ currentStatus, onStatusChange }) => {
  const filters = [
    "All",
    "Unpaid",
    "Need to Ship",
    "Sent",
    "Completed",
    "Cancellation",
    "Returns",
  ];

  return (
    <div className="flex gap-6 border-b pb-0 border-gray-500">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`pl-2 pb-2 ${
            currentStatus === filter.toLocaleLowerCase()
              ? "active border-b-2 b-2 border-red-500 text-red-500"
              : ""
          }`}
          onClick={() => onStatusChange(filter.toLocaleLowerCase())}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default OrderFilter;
