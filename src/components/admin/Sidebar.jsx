import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { RiProductHuntLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";

const Sidebar = ({ openSidebar }) => {
  return (
    <div
      className={`bg-blue-300 fixed top-16 left-0 h-full ${
        openSidebar ? "w-48" : "w-16"
      } transition-all duation-500 ease-in-out`}
    >
      <div className="flex flex-col gap-4 p-4">
        <div>
          <Link to={"/admin"} className="flex items-center gap-2">
            <IoHomeOutline className="text-2xl" />
            {openSidebar ? "Dashboard" : null}
          </Link>
        </div>
        <div>
          <Link to={"/admin/users"} className="flex items-center gap-2">
            <FiUsers className="text-2xl" /> {openSidebar && "Users"}
          </Link>
        </div>
        <div>
          <Link to={"/admin/products"} className="flex items-center gap-2">
            <RiProductHuntLine className="text-2xl" />
            {openSidebar && " Products"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
