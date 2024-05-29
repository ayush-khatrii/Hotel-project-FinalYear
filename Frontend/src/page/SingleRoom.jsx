import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Review from "../components/Review";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { RangeCalendar } from "@nextui-org/calendar";
import Modal from "../components/ui/modal";
import { Button, Chip } from "@nextui-org/react";
const SingleRoom = () => {
  const [reviews, setReviews] = useState([]);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [singleRoomDetails, setSingleRoomDetails] = useState([]);
  const [totalNights, setTotalNights] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const navigate = useNavigate();
  const { id } = useParams();

  const today = new Date().toISOString().split("T")[0];
  const { isLoggedIn } = useAuth();

  const fetchRoom = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/rooms/${id}`);
      const roomsData = await response.json();
      setSingleRoomDetails(roomsData);
      setReviews(roomsData.reviews);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const handleDateChange = (range) => {
    const startDate = new Date(range.start.year, range.start.month - 1, range.start.day);
    const endDate = new Date(range.end.year, range.end.month - 1, range.end.day);

    setCheckIn(startDate);
    setCheckOut(endDate);
  };

  useEffect(() => {
    fetchRoom();
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkIn || !checkOut || adults < 1) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!isLoggedIn) {
      setTimeout(() => {
        toast.error("Please login to book room!");
      }, 2000);
      navigate("/login");
      localStorage.setItem("non-auth-bookings", id);
      return;
    }
    const checkinDate = new Date(checkIn);
    const checkoutDate = new Date(checkOut);


    if (checkoutDate.getTime() === checkinDate.getTime()) {
      toast.error("Check-in and check-out dates cannot be the same.");
      return;
    }
    const diff = Math.abs(checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24);
    setTotalNights(diff);
    setIsModalOpen(true);
  };

  return (
    <>
      <Toaster />
      <div className="container max-w-7xl mx-auto mt-20 Z px-10">
        <div className="grid grid-cols-1  gap-10">
          <div>
            <img
              src={singleRoomDetails.roomImages && singleRoomDetails.roomImages[0]}
              alt={singleRoomDetails.roomName}
              className="w-full h-auto object-center object-cover mb-6"
            />
          </div>
          <div className="flex lg:flex-row justify-between flex-col">
            <div>
              <h1 className="text-4xl font-bold mb-4 capitalize">
                {singleRoomDetails.roomType}
              </h1>
              <p className="text-gray-600 mb-6 w-1/2">
                {singleRoomDetails.description}
              </p>
              <div className="flex items-start justify-center flex-col mb-6">
                <p className="text-2xl font-bold text-gray-700">
                  Beds: {singleRoomDetails.numberofbeds}
                </p>
                <p className="text-2xl font-bold text-gray-700">
                  Price: ₹{singleRoomDetails.price}/night
                </p>
              </div>
              <p className="text-lg font-bold mb-3">Amenities:</p>
              <ul className="flex flex-wrap gap-2 text-lg text-gray-600">
                {singleRoomDetails.amenities?.map((amenity, index) => (
                  <Chip key={index} color="danger">{amenity}</Chip>
                ))}
              </ul>
            </div>
            <form onSubmit={handleSubmit}>
              <div className=" gap-5 flex flex-col justify-center items-center text-left my-5 mt-10">
              </div>
              <div>
                <RangeCalendar
                  aria-label="Date (Visible Month)"
                  visibleMonths={2}
                  onChange={handleDateChange}
                />
                <div className="grid grid-cols-1 w-full gap-5">
                  <div>
                    <label>Number of Adults</label>
                    <input
                      required
                      type="number"
                      min="1"
                      className="border border-zinc-500 py-2 px-4 w-full"
                      value={adults}
                      onChange={(e) => setAdults(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Number of Children</label>
                    <input
                      type="number"
                      min="0"
                      className="border border-zinc-500 py-2 px-4 w-full"
                      value={children}
                      onChange={(e) => setChildren(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full my-3">
                <Button type="submit" fullWidth radius="none" color="danger">
                  Book Now
                </Button>
              </div>

            </form>
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          checkIn={checkIn}
          checkOut={checkOut}
          adults={adults}
          children={children}
          totalNights={totalNights}
          price={singleRoomDetails.price}
          roomDetails={singleRoomDetails}
        // content={
        //   <div>
        //     <p>Check-in Date: {checkIn?.toLocaleDateString()}</p>
        //     <p>Check-out Date: {checkOut?.toLocaleDateString()}</p>
        //     <p>Number of Adults: {adults}</p>
        //     <p>Number of Children: {children}</p>
        //     <p>Total Nights: {totalNights}</p>
        //     <p>Total Price: ₹{singleRoomDetails.price * totalNights}</p>
        //   </div>
        // }
        />
        <Review />
      </div>
    </>

  );
};

export default SingleRoom;
