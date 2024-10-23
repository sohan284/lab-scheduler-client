import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const TabNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { label: "+ SCHEDULE A TASK", path: "/ScheduleATask" },
    { label: "SCHEDULED TASKS", path: "/addedTasks" },
    { label: "TUTORIALS", path: "/tutorials" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="max-w-[1200px] mx-auto px-4 py-2  mt-7">
      <div className="sm:hidden flex justify-end mb-4">
        <button onClick={toggleMenu} className="text-gray-500">
          {isMenuOpen ? <IoClose size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      <div className={`${isMenuOpen ? "block" : "hidden"} sm:block`}>
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) => `
                w-full sm:w-auto text-xs sm:text-sm text-center
                px-2 sm:px-4 py-2 uppercase font-semibold rounded-md transition-colors duration-200
                ${isActive ? "text-white bg-orange-500" : "hover:text-gray-700 hover:outline hover:shadow-xl"}
              `}
              onClick={() => setIsMenuOpen(false)} // Close menu on click
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default TabNav;
