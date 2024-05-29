import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  const { user, token } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
  });

  const [userData, setUserData] = useState("");

  const { id } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      toast.success(data.message, { duration: 2000 });
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

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const userdata = await response.json();
        setUserData(userdata);
      } catch (error) {
        toast.error(error.message);
      }
    };

    getUserById();
  }, []);

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mt-40">
        <h1 className="text-gray-700 font-bold my-10">
          Upadte <strong>{userData.username + "'s"}</strong> info
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

export default UpdateUser;
