import { Outlet } from "react-router";
import Sidebar from "./admin-components/Sidebar";

const AdminLayout = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
