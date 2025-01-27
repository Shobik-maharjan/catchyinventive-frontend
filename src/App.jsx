import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "pages/auth/AdminLogin";
import AdminLayout from "./layout/AdminLayout";
import AdminRoute from "./routes/AdminRoute";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "components/ScrollToTop";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer closeOnClick />
        <ScrollToTop />
        <Routes>
          <Route path="admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="*" element={<AdminRoute />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
