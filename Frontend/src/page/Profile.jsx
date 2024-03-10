import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";

const Profile = () => {
  const { logoutUser, user, token } = useAuth();

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user && user.user._id) {
      const fetchBookingData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/users/${user.user._id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const result = await response.json();
          setBookings(result.booking);
        } catch (error) {
          toast.error(error.message);
        }
      };

      fetchBookingData();
    }
  }, [user]);

  console.log(bookings);
  return (
    <>
      <Toaster />
      <div className="container px-10 mx-auto max-w-7xl mt-20 mb-52">
        <div className="mt-10 ">
          <div className="flex flex-col">
            <div className="flex justify-start gap-10 items-center">
              <h1 className="font-bold text-xl my-5">Personal Information</h1>
              <span className="cursor-pointer text-blue-600 ">
                <Edit size={20} />
              </span>
            </div>
            <div className="flex flex-col justify-center item-center text-center">
              <div className="flex ">
                <h1 className="font-bold text-gray-800 text-xl mr-3">Name :</h1>
                <p className="items-center capitalize text-center text-xl">
                  {user?.user?.username}
                </p>
              </div>
              <div className="flex ">
                <h1 className="font-bold text-gray-800 text-xl mr-3">
                  Email :
                </h1>
                <p className="items-center  text-center text-xl">
                  {user?.user?.email}
                </p>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={logoutUser}
              className="text-white bg-red-700 px-2 py-1 text-base  mt-10 font-medium rounded"
            >
              Logout
            </button>
          </div>
          <div className="flex flex-col items-center justify-center space-y-5">
            <h1 className="font-bold text-xl my-5">Your Bookings</h1>
            {bookings.map((item, index) => (
              <div className="bg-white shadow-lg p-5 rounded-lg" key={index}>
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <img
                    src={
                      item?.imgUrl || "https://via.placeholder.com/1920x1280"
                    }
                    alt="Booking Image"
                    className="w-full md:w-1/4 h-auto object-cover rounded-lg mb-5 md:mb-0 md:mr-5"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-bold text-xl mb-2">
                      This is booking title
                    </h1>
                    <p className="mb-2">
                      Check-in:{" "}
                      {new Date(item.checkindate).toLocaleDateString()}
                    </p>
                    <p className="mb-2">
                      Check-out:{" "}
                      {new Date(item.checkoutdate).toLocaleDateString()}
                    </p>
                    <p className="mb-2">Adults: {item.adults}</p>
                    <p className="mb-2">Children: {item.children}</p>
                    <p className="mb-2">Phone Number: {item.phoneNumber}</p>
                    <span className="font-bold text-lg">
                      ₹{item?.totalPrice}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
