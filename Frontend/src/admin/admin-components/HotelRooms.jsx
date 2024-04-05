import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Rooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  const { token } = useAuth();

  useEffect(() => {
    const getRooms = async () => {
      try {
        const response = await fetch("http://localhost:3000/rooms", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const roomsData = await response.json();
        setRooms(roomsData);
      } catch (error) {
        console.error(error.message);
      }
    };

    getRooms();
  }, []);

  const handleDeleteRoom = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/rooms/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setRooms(rooms.filter((room) => room._id !== id));

      toast.success("Room Deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster />
      <section className="container mx-auto">
        <h1 className="font-bold text-center text-xl py-10">All Rooms</h1>
        <div className="flex justify-center">
          <div className=" max-w-4xl">
            <table className="w-full table-auto mb-10 min-w-full divide-y  divide-gray-600 border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-center text-sm font-bold uppercase">
                    Images
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-bold uppercase">
                    Room Type
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-bold uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-bold uppercase">
                    Description
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-bold uppercase">
                    Amenities
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-bold uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-bold uppercase">
                    Number of Beds
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-bold uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rooms.map((room) => (
                  <tr key={room._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={room.roomImages[0]} alt="" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {room.roomType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {room.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {room.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {room.amenities.join(", ")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {room.isBooked ? "Booked" : "Not Booked"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {room.numberofbeds}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex justify-center gap-2">
                      <button
                        onClick={() => handleDeleteRoom(room._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/admin/room/${room._id}`}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Link
              to={`/admin/post-rooms`}
              className="cursor-pointer fixed bottom-4 right-4"
            >
              <button className="bg-blue-600 flex py-2 px-4 text-white gap-1 rounded-full">
                Add Room
                <Plus color="white" />
              </button>
            </Link>
          </div>
        </div>
      </section>
      {rooms.length < 1 && (
        <>
          <p className="text-center text-xl p-6">No rooms to show!</p>
          <p className="text-center text-xl">
            Please add rooms to by clicking on the Add Room button
          </p>
        </>
      )}
    </>
  );
};

export default Rooms;
