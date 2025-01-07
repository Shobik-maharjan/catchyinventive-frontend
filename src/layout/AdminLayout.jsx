import Navbar from "components/admin/Navbar";
import Sidebar from "components/admin/Sidebar";
import React, { useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { TbBackslash } from "react-icons/tb";

const AdminLayout = () => {
  const location = useLocation();

  const [openSidebar, setOpenSidebar] = useState(true);

  const toggleSidebar = () => {
    console.log("clicked");
    setOpenSidebar(!openSidebar);
  };

  return (
    <>
      <div className="flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />

        <div className=" flex bg-gray-200">
          <Sidebar openSidebar={openSidebar} />
          <div
            className={`flex-grow p-4 transition-all duration-500 ${
              openSidebar ? "ml-48" : "ml-16"
            }`}
          >
            <div className="flex items-center gap-1 text-2xl mb-4">
              <Link to={"/admin"}>
                <IoHomeOutline />
              </Link>
              <TbBackslash />
              {location.pathname === "/admin" && "home"}
              {location.pathname.replace("admin", "").split("/")}
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
