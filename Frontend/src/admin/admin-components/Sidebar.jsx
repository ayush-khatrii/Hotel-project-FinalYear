import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex flex-col fixed h-screen  bg-gray-800 w-64">
      <div className="h-20 bg-gradient-to-b from-blue-600 to-blue-800 flex items-center justify-center text-white text-lg font-semibold">
        Maruti Hotel
      </div>
      <div className="flex-1 overflow-y-auto">
        <Link
          to="/admin/home"
          className="block px-6 py-3 text-white hover:bg-gray-700"
        >
          <span className="text-xl mr-3">
            <i className="fas fa-home"></i>
          </span>
          Home
        </Link>
        <Link
          to="/admin/users"
          className="block px-6 py-3 text-white hover:bg-gray-700"
        >
          <span className="text-xl mr-3">
            <i className="fas fa-info-circle"></i>
          </span>
          Users
        </Link>
        <Link
          to="/admin/bookings"
          className="block px-6 py-3 text-white hover:bg-gray-700"
        >
          <span className="text-xl mr-3">
            <i className="fas fa-envelope"></i>
          </span>
          Bookings
        </Link>
        <Link
          to="/admin/hotelrooms"
          className="block px-6 py-3 text-white hover:bg-gray-700"
        >
          <span className="text-xl mr-3">
            <i className="fas fa-envelope"></i>
          </span>
          Rooms
        </Link>
      </div>
      <div className="h-16 bg-gray-900 flex items-center justify-center text-white text-sm">
        © 2024 Maruti Hotel
      </div>
    </div>
  );
};

export default Sidebar;
