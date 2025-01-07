import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "pages/auth/AdminLogin";
import AdminLayout from "./layout/AdminLayout";
import AdminRoute from "./routes/AdminRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
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
