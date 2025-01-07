import React, { useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="bg-orange-200 px-10 h-16 flex justify-between content-center">
      <div className="content-center relative">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGi06jOWFhqsqiks8os-n7H2vlSQGE893SIQ&s"
          alt="logo"
          width="50px"
          className="rounded-full"
        />
        <RxHamburgerMenu
          className="absolute -left-7 top-1/3 text-xl"
          onClick={toggleSidebar}
        />
      </div>
      <ul className="flex justify-end gap-4 items-center">
        <li className="text-2xl cursor-pointer">
          <IoMdNotifications />
        </li>
        <li className="text-2xl cursor-pointer">
          <RxAvatar />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
