import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const ConfirmBooking = () => {
  const [phone, setPhone] = useState("");
  const location = useLocation();
  const { id } = useParams();

  const { user, isLoggedIn, token } = useAuth();

  const {
    singleRoomDetails,
    adults,
    children,
    checkIn,
    checkOut,
    totalNights,
    price,
    imgUrl,
  } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await fetch(
        `http://localhost:3000/checkout/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            singleRoomDetails: singleRoomDetails,
            adults,
            children,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            totalPrice: price,
            phone,
            imgUrl,
          }),
        }
      );

      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data.message);
      }

      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      <Navigate to={`/`} />;
    }
  }, []);

  return (
    <>
      <Toaster />
      <div className="flex md:flex-row flex-col justify-center  my-40  px-5">
        <div className="rounded-md">
          <div className="px-6 py-4">
            <h2 className="text-xl text-center mb-10 font-bold text-gray-800">
              Book Your Room
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className=" text-gray-700 font-bold mb-2"
                >
                  Your Name:
                </label>
                <input
                  type="text"
                  value={user?.user?.username}
                  id="fullName"
                  name="fullName"
                  className="w-full capitalize px-3 py-2 border rounded-md focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className=" text-gray-700 font-bold mb-2"
                >
                  Email:
                </label>
                <input
                  type="email"
                  value={user?.user?.email}
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className=" text-gray-700 font-bold mb-2"
                >
                  Phone Number:
                </label>
                <input
                  value={phone}
                  type="number"
                  name="phoneNumber"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-red-500"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="p-2 w-full bg-red-700 text-white rounded-md hover:bg-red-900"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="rounded-md overflow-hidden">
          <div className="px-6 py-4 rounded-md">
            <div className="border border-zinc-300 p-5 rounded">
              <div className="text-xl  mb-2">
                <label className="text-gray-700">Room Name</label>
                <h1 className="font-bold "> {singleRoomDetails.roomType}</h1>
              </div>
              <div className="text-xl  mb-2">
                <label className="text-gray-700"> Total Price </label>
                <h1 className="font-bold ">
                  ₹{price} ({totalNights} nights x original price)
                </h1>
              </div>
              <div className="text-xl  mb-2">
                <label className="text-gray-700">Total Guests</label>
                <h1 className="font-bold ">
                  {adults} Adults , {children} children
                </h1>
              </div>
              <div className="text-xl  mb-2">
                <label className="text-gray-700">Check-In-Date</label>
                <h1 className="font-bold ">{checkIn}</h1>
              </div>
              <div className="text-xl  mb-2">
                <label className="text-gray-700">Check-Out-Date</label>
                <h1 className="font-bold ">{checkOut}</h1>
              </div>
              <div className="text-xl  mb-2">
                <label className="text-gray-700">Total Nights</label>
                <h1 className="font-bold ">{totalNights}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmBooking;
