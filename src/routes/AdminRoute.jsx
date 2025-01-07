import Dashboard from "pages/admin/Dashboard";
import Products from "pages/admin/Products";
import Users from "pages/admin/Users";
import React from "react";
import { Route, Routes } from "react-router-dom";

const AdminRoute = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  );
};

export default AdminRoute;
