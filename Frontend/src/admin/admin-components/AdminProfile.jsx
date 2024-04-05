import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { Edit } from "lucide-react";

const AdminProfile = () => {
  // State variables for user inputs
  const { user, token } = useAuth();
  const [userData, setUserData] = useState({
    username: user.username,
    email: user.email,
  });
  const [formData, setFormData] = useState({
    username: "",
  });

  const userId = user?.user?._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      const adminData = await response.json();
      if (response.ok) {
        toast.success("Admin name and email updated");
      }
      if (!response.ok) {
        toast.error(adminData.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mt-40">
        <h1 className="text-gray-700 font-bold my-10">
          Upadte <strong>{user?.user?.username + "'s"}</strong> info
        </h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Update Name
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Update
        </button>
      </form>
    </>
  );
};

export default AdminProfile;
