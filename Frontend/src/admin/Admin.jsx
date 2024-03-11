import Sidebar from "./admin-components/Sidebar";
import Home from "./admin-components/Home";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  useEffect(() => {
    if (!token && !user.isAdmin) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Sidebar />
      <Home />
    </div>
  );
};

export default Admin;
