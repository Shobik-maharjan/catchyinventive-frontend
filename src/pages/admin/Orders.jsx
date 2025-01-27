import OrderFilter from "components/OrderFilter";
import OrderList from "components/OrderList";
import React, { useState } from "react";

const Orders = () => {
  const [status, setStatus] = useState("all");
  return (
    <div>
      <OrderFilter currentStatus={status} onStatusChange={setStatus} />
      <OrderList status={status} />
    </div>
  );
};

export default Orders;
