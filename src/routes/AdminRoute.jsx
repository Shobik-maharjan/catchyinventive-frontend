import CreateProduct from "components/admin/CreateProduct";
import EditProduct from "components/admin/EditProduct";
import RegisterUser from "components/admin/RegisterUser";
import Dashboard from "pages/admin/Dashboard";
import Orders from "pages/admin/Orders";
import Products from "pages/admin/Products";
import Users from "pages/admin/Users";
import React from "react";
import { Route, Routes } from "react-router-dom";

const AdminRoute = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/create" element={<RegisterUser />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/create" element={<CreateProduct />} />
      <Route path="/products/:productId" element={<EditProduct />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
};

export default AdminRoute;
