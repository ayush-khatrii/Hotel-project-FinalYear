import { Outlet } from "react-router";
import Sidebar from "./admin-components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { CircleUserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminLayout = () => {
  const { user, isLoggedIn } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoggedIn) {
      navigate("/admin-login");
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-shrink-0">
        <Sidebar />
      </div>
      <div className="bg-white shadow-md flex justify-around items-center px-4 py-3">
        <h1 className="font-bold text-2xl">Dashboard</h1>
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
