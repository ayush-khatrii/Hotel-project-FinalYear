import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Users = () => {
  const { token, user } = useAuth();
  const [allUsers, setAllUser] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await response.json();
        setAllUser(userData.filter((data) => !data.isAdmin));
      } catch (error) {
        toast.error(error.message);
      }
    };

    getUser();
  }, []);

  const handleDelete = async (userId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete the user!"
    );

    if (isConfirmed) {
      try {
        const resp = await fetch(`http://localhost:3000/users/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (resp.ok) {
          toast.success("User Deleted successfully");
        }
        setAllUser(allUsers.filter((user) => user._id !== userId));
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      return;
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex  pt-10 justify-center items-center">
        <table className="table-auto border">
          <thead className="bg-gray-200 ">
            <tr>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>{allUsers.length < 0 && <p>Not users to show!!</p>}</tr>
            {allUsers?.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>

                <td className="border px-4 py-2">
                  <Link
                    to={`/admin/users/${user._id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
