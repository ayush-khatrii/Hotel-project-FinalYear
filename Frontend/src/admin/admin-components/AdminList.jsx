import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const getAdmins = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const adminData = await response.json();
        const adminUsers = adminData.filter((user) => user.isAdmin);
        setAdmins(adminUsers);
      } catch (error) {
        console.error(error.message);
      }
    };

    getAdmins();
  }, []);

  return (
    <div className="flex  pt-10 justify-center items-center">
      <table className="table-auto border">
        <thead className="bg-gray-200 ">
          <tr>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Roles</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                {user.isAdmin ? "Admin" : "User"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminList;
