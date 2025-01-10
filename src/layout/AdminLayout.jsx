import Navbar from "components/admin/Navbar";
import Sidebar from "components/admin/Sidebar";
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";

const AdminLayout = () => {
  const location = useLocation();

  const [openSidebar, setOpenSidebar] = useState(true);

  const toggleSidebar = () => {
    console.log("clicked");
    setOpenSidebar(!openSidebar);
  };

  const pathnames = location.pathname
    .replace("admin", "")
    .split("/")
    .filter((x) => x);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar toggleSidebar={toggleSidebar} />

        <div className=" flex">
          <Sidebar openSidebar={openSidebar} />
          <div
            className={`flex-grow transition-all duration-500 ${
              openSidebar ? "ml-48" : "ml-16"
            }`}
          >
            <div className="bg-gray-200 min-h-screen overflow-hidden p-4">
              <div
                className={`flex items-center gap-1 text-2xl ${
                  pathnames.length === 0 ? "p-0" : "pb-4"
                }`}
              >
                {pathnames.length > 0 && (
                  <Link to={"/admin"}>
                    <IoHomeOutline />
                  </Link>
                )}
                {pathnames.map((name, index) => {
                  const isLast = index === pathnames.length - 1;

                  const breadcrumbPath = `/admin/${pathnames
                    .slice(0, index + 1)
                    .join("/")}`;

                  return isLast ? (
                    <span key={breadcrumbPath}>/ {name}</span>
                  ) : (
                    <span key={breadcrumbPath}>
                      / <Link to={breadcrumbPath}>{name}</Link>
                    </span>
                  );
                })}
              </div>
              <div className="">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
