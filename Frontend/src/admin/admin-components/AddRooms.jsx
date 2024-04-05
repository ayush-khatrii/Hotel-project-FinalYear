import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { Cross, X } from "lucide-react";

const AddRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [amenityInput, setAmenityInput] = useState([]);
  const [newRoom, setNewRoom] = useState({
    roomType: "",
    price: 0,
    description: "",
    amenities: [],
    roomImages: [],
    numberofbeds: 0,
    isBooked: false,
  });
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch("http://localhost:3000/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newRoom),
      });

      const data = await response.json();

      toast.success(data.message, { duration: 2000 });
      setNewRoom("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  const addAmenity = () => {
    if (amenityInput.trim() !== "") {
      setNewRoom((prevRoom) => ({
        ...prevRoom,
        amenities: [...prevRoom.amenities, amenityInput],
      }));
    }
  };

  const handleDeleteAmenity = (id) => {
    setNewRoom((prevRoom) => ({
      ...prevRoom,
      amenities: prevRoom.amenities.filter((amenity, index) => index !== id),
    }));
  };

  return (
    <>
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="flex justify-center  flex-col w-full max-w-3xl mx-auto mb-10 px-10"
      >
        <h1 className="text-center my-10 font-bold text-2xl">Post Room </h1>
        <div className="mb-4">
          <label className="block mb-1">Room Type:</label>
          <input
            type="text"
            name="roomType"
            value={newRoom.roomType}
            onChange={handleChange}
            className="w-full border-2 border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Room Images (url): </label>
          <input
            type="text"
            name="roomImages"
            value={newRoom.roomImages}
            onChange={handleChange}
            className="w-full border-2 border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">No of Beds:</label>
          <input
            type="number"
            name="numberofbeds"
            value={newRoom.numberofbeds}
            onChange={handleChange}
            className="w-full border-2 border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Price:</label>
          <input
            type="number"
            name="price"
            value={newRoom.price}
            onChange={handleChange}
            className="w-full border-2 border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description:</label>
          <textarea
            name="description"
            value={newRoom.description}
            onChange={handleChange}
            className="w-full border-2 border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-1">amenities:</label>
          <div className="flex items-center">
            <input
              type="text"
              value={amenityInput}
              onChange={(e) => setAmenityInput(e.target.value)}
              className="w-full border-2 border-gray-400 rounded-md px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
              placeholder="Enter amenity"
              required
            />
            <button
              type="button"
              onClick={addAmenity}
              className="bg-blue-500  text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Add
            </button>
          </div>
          <ul className="mt-2 flex  items-center  gap-2">
            {newRoom?.amenities?.map((amenity, index) => (
              <li
                key={index}
                className="bg-gray-200 flex justify-between items-center border-2border-gray-400 rounded px-3 py-1"
              >
                <span>{amenity}</span>
                <button
                  onClick={() => handleDeleteAmenity(index)}
                  className="text-gray-700"
                >
                  <X />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Create Room
        </button>
      </form>
    </>
  );
};

export default AddRooms;
