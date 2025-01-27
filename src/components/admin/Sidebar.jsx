import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { PiShoppingBagOpenLight } from "react-icons/pi";
import { IoHomeOutline, IoPricetagOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";

const Sidebar = ({ openSidebar }) => {
  const data = useMemo(
    () => [
      {
        id: 1,
        name: "Dashboard",
        icon: <IoHomeOutline className="text-2xl" />,
      },
      {
        id: 2,
        name: "Users",
        icon: <FiUsers className="text-2xl" />,
      },
      {
        id: 3,
        name: "Products",
        icon: <IoPricetagOutline className="text-2xl" />,
      },
      {
        id: 4,
        name: "Orders",
        icon: <PiShoppingBagOpenLight className="text-2xl" />,
      },
      {
        id: 5,
        name: "Category",
        icon: <BiCategory className="text-2xl" />,
      },
      {
        id: 6,
        name: "Notification",
        icon: <IoMdNotificationsOutline className="text-2xl" />,
      },
      {
        id: 7,
        name: "Setting",
        icon: <CiSettings className="text-2xl" />,
      },
    ],
    []
  );

  const [selected, setSelected] = useState("");

  useEffect(() => {
    const loc = window.location.pathname;
    const pathName = loc.split("/");
    const path = pathName[2];

    const foundItem = data.find(
      (item) => item.name.toLocaleLowerCase() === path
    );
    if (foundItem) {
      setSelected(foundItem.name);
    } else {
      setSelected("Dashboard");
    }
  }, []);

  return (
    <div
      className={`bg-white fixed z-20 top-0 left-0 h-full transition-all duration-300 ease-in-out border-r-2 border-black/20 ${
        openSidebar ? "w-48" : "w-16"
      }`}
    >
      <div className="flex items-center justify-center h-16">
        <Link to="/admin">
          <img
            src="catchyinventive-logo.png"
            alt="logo"
            width="40px"
            className="rounded-full"
          />
        </Link>
      </div>

      <div
        className={`flex flex-col gap-4 pt-2 px-4 transition-all duration-300 ease-in-out
        `}
      >
        {data.map((item) => (
          <Link
            to={`${
              item.name === "Dashboard"
                ? "/admin"
                : `/admin/${item.name.toLocaleLowerCase()}`
            }`}
            onClick={() => setSelected(item.name)}
            key={item.id}
            className="flex items-center gap-2"
          >
            <div
              className={`${
                selected === item.name ? "text-blue-500" : ""
              } flex items-center gap-2 hover:text-blue-600`}
            >
              <div>{item.icon}</div>
              <span
                className={`${
                  openSidebar ? "opacity-100  duration-500" : "opacity-0"
                } transition-opacity ease-in-out`}
              >
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
