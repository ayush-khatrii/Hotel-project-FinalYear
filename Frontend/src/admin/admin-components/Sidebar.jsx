import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { User } from "lucide-react";
const Sidebar = () => {
  const { logoutUser } = useAuth();

  return (
    <div className="flex flex-col fixed h-screen  bg-gray-800 w-64">
      <div className="h-20 bg-gradient-to-b from-blue-600 to-blue-900 flex items-center justify-center text-white text-lg font-semibold">
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
          to="/admin/admins"
          className="block px-6 py-3 text-white hover:bg-gray-700"
        >
          <span className="text-xl mr-3">
            <i className="fas fa-info-circle"></i>
          </span>
          Admins
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
        <Link
          to="/admin/reviews"
          className="block px-6 py-3 text-white hover:bg-gray-700"
        >
          <span className="text-xl mr-3">
            <i className="fas fa-envelope"></i>
          </span>
          Reviews
        </Link>
        <Link
          to="/admin/contacts"
          className="block px-6 py-3 text-white hover:bg-gray-700"
        >
          <span className="text-xl mr-3">
            <i className="fas fa-envelope"></i>
          </span>
          Contact
        </Link>
      </div>
      <div className="my-3 flex-col justify-center items-center flex px-2 gap-3">
        <Link
          to={`/admin/profile`}
          className=" w-full gap-1 text-white flex items-center justify-center border border-gray-700 px-2 py-1 text-base font-medium rounded"
        >
          <User size={17} /> Profile
        </Link>
        <button
          onClick={logoutUser}
          className=" w-full text-white bg-blue-700 px-2 py-1 text-base  font-medium rounded"
        >
          Logout
        </button>
      </div>
      <div className="h-16 bg-gray-900 flex items-center justify-center text-white text-sm">
        © 2024 Maruti Hotel
      </div>
    </div>
  );
};

export default Sidebar;
