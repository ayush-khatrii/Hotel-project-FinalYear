import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";

const Profile = () => {
  const { logoutUser, user, token } = useAuth();

  const [bookings, setBookings] = useState([]);
  const fetchBookingData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/users/${user?.user?._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      console.log(result.bookings);
      setBookings(result.bookings);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user && user.user && user.user._id) {
      fetchBookingData();
    }
  }, [user]);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this booking?");
    if (!isConfirmed) {
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/bookings/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setBookings(bookings.filter((item) => item._id !== id));
      toast.success(data.message, { duration: 2000 });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Toaster />
      <div className="container px-10 mx-auto max-w-7xl mt-20 mb-52">
        <div className="mt-10 ">
          <div className="flex flex-col">
            <div className="flex justify-start gap-10 items-center">
              <h1 className="font-bold text-xl my-5">Personal Information</h1>
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
              className="text-white rounded bg-red-600 px-2 py-1 text-base  mt-10 font-medium "
            >
              Logout
            </button>
          </div>
          <div className="mt-20">
            <h1 className="font-bold text-xl my-5">Your Bookings</h1>
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookings.map((item, index) => (
                  <div
                    className="border border-gray-400 overflow-hidden bg-white shadow-xl rounded"
                    key={index}
                  >
                    <img
                      src={
                        item?.imgUrl || "https://via.placeholder.com/1920x1280"
                      }
                      alt="Room"
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 text-lg">
                      <h1 className="font-bold text-xl mb-2">
                        {item.roomType}
                      </h1>
                      <p className="mb-2">
                        Check-in:
                        {new Date(item.checkindate).toLocaleDateString()}
                      </p>
                      <p className="mb-2">
                        Check-out:
                        {new Date(item.checkoutdate).toLocaleDateString()}
                      </p>
                      <p className="mb-2">Adults: {item.adults}</p>
                      <p className="mb-2">Children: {item.children}</p>
                      <span className="font-bold text-xl">
                        ₹{item?.totalPrice}
                      </span>
                    </div>
                    <div className="p-4 flex justify-end">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="px-3 w-full py-[5px] bg-red-600 rounded text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
