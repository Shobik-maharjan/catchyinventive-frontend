import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const api = import.meta.env.VITE_PORT;
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfileOpen = (event) => {
    event.stopPropagation(); // Prevent event bubbling when clicking on the avatar
    setIsProfileOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    // Add event listener for clicks outside the dropdown
    document.addEventListener("click", handleClickOutside);

    // Cleanup event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const logoutUser = async () => {
    await axios.post(`${api}/logout`);
    navigate("/admin/login");
  };

  return (
    <div className="bg-white z-30 sticky top-0 w-full px-4 h-16 flex justify-between content-center border-b">
      <div className="flex items-center gap-4">
        <RxHamburgerMenu
          className="text-xl cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>
      <ul className="flex justify-end gap-4 items-center">
        <li className="text-3xl cursor-pointer">
          <IoMdNotificationsOutline />
        </li>
        {/* <div className="dropdown"> */}
        <li className="text-3xl cursor-pointer">
          <RxAvatar onClick={toggleProfileOpen} />
        </li>
        {isProfileOpen && (
          <ul
            tabIndex={0}
            className={`menu bg-base-100 w-52 p-2 rounded-none shadow absolute right-0 top-16 max-h-[calc(100vh-4rem)] overflow-y-auto`}
            ref={dropdownRef}
          >
            <li>
              <Link to="">My Account</Link>
              <Link to="">Settings</Link>
              <div onClick={logoutUser}>logout</div>
            </li>
          </ul>
        )}
        {/* </div> */}
        {/* </li> */}
      </ul>
    </div>
  );
};

export default Navbar;
