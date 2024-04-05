import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { X } from "lucide-react";
import { useParams } from "react-router-dom";

const updatedRoom = () => {
  const { id } = useParams();

  const [amenityInput, setAmenityInput] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [updatedRoom, setupdatedRoom] = useState({
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
      const response = await fetch(`http://localhost:3000/rooms/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(roomData),
      });

      if (response.ok) {
        toast.success("Room updated successfully!", { duration: 2000 });
      }
      setupdatedRoom("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const getRoomById = async () => {
      try {
        const response = await fetch(`http://localhost:3000/rooms/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const roomData = await response.json();
        setRoomData(roomData);
      } catch (error) {
        toast.error(error.message);
      }
    };

    getRoomById();
  }, []);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setupdatedRoom((prevRoom) => ({
        ...prevRoom,
        [name]: checked,
      }));
    } else {
      setupdatedRoom((prevRoom) => ({
        ...prevRoom,
        [name]: value,
      }));

      setRoomData((prevRoomData) => ({
        ...prevRoomData,
        [name]: value,
      }));
    }
  };

  const addAmenity = () => {
    if (amenityInput.trim() !== "") {
      setupdatedRoom((prevRoom) => ({
        ...prevRoom,
        amenities: [...prevRoom.amenities, amenityInput],
      }));
    }
  };

  const handleDeleteAmenity = (id) => {
    setupdatedRoom((prevRoom) => ({
      ...prevRoom,
      amenities: prevRoom.amenities.filter((amenity, index) => index !== id),
    }));
  };

  const handleAddAmenitiy = () => {
    addAmenity();
    setAmenityInput("");
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
            value={updatedRoom.roomType}
            onChange={handleChange}
            className="w-full border-2 border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Room Images (url): </label>
          <input
            type="text"
            name="roomImages"
            value={updatedRoom.roomImages}
            onChange={handleChange}
            className="w-full border-2 border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">No of Beds:</label>
          <input
            type="number"
            name="numberofbeds"
            value={updatedRoom.numberofbeds}
            onChange={handleChange}
            className="w-full border-2 border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Price:</label>
          <input
            type="number"
            name="price"
            value={updatedRoom.price}
            onChange={handleChange}
            className="w-full border-2 border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className=" flex justify-start my-10 items-center gap-5">
          <label className="block mb-1">Is Room Booked? :</label>

          <input
            type="checkbox"
            name="isBooked"
            checked={updatedRoom.isBooked}
            onChange={handleChange}
            className="size-5 text-blue-600 mb-2 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
          />

          <p>(Check the box if room is booked!) </p>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description:</label>
          <textarea
            name="description"
            value={updatedRoom.description}
            onChange={handleChange}
            className="w-full border-2 border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
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
            />
            <button
              type="button"
              onClick={handleAddAmenitiy}
              className="bg-blue-500  text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Add
            </button>
          </div>
          <ul className="mt-2 flex  items-center  gap-2">
            {updatedRoom?.amenities?.map((amenity, index) => (
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
          Update Room
        </button>
      </form>
    </>
  );
};

export default updatedRoom;
