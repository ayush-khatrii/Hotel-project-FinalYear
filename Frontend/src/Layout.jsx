import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
const Layout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user?.user?.isAdmin) {
    navigate("/admin");
  }
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
