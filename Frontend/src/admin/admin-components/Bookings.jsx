import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Bookings = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/bookings`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const bookingsData = await response.json();
        setBookings(bookingsData);
      } catch (error) {
        console.error(error.message);
      }
    };

    getBookings();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/bookings/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setBookings(bookings.filter((item) => item._id !== id));
        toast.success(data.message, { duration: 2000 });
      }
      toast.error(data.message, { duration: 2000 });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster />
      {bookings.length > 0 ? (
        <>
          <section className="container mx-auto flex justify-center items-center">
            <div className="w-full max-w-4xl">
              <h1 className="font-bold text-center my-10 text-xl">
                All Bookings
              </h1>
              <table className="w-full table-auto mb-10 min-w-full border">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 text-sm py-2">Booking Id</th>
                    <th className="px-4 text-sm py-2">Username</th>
                    <th className="px-4 text-sm py-2">Check-in Date</th>
                    <th className="px-4 text-sm py-2">Check-out Date</th>
                    <th className="px-4 text-sm py-2">Total Price</th>
                    <th className="px-4 text-sm py-2">RoomId</th>
                    <th className="px-4 text-sm py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td className="border px-4 py-2">{booking._id}</td>
                      <td className="border px-4 py-2">
                        {booking.user?.username}
                      </td>
                      <td className="border px-4 py-2">
                        {new Date(booking.checkindate).toLocaleDateString()}
                      </td>
                      <td className="border px-4 py-2">
                        {new Date(booking.checkoutdate).toLocaleDateString()}
                      </td>
                      <td className="border px-4 py-2">
                        ₹{booking.totalPrice}
                      </td>
                      <td className="border px-4 py-2">{booking.room}</td>
                      <td className="border flex flex-col gap-2 px-4 py-2">
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleDelete(booking._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Link
                to={`/admin/post-rooms`}
                className="border border-zinc-700 p-1 rounded-full cursor-pointer fixed bottom-4 right-4"
              >
                <Plus color="blue" />
              </Link>
            </div>
          </section>
        </>
      ) : (
        <p className="text-center pt-10 font-bold text-xl">
          No bookings to show!
        </p>
      )}
    </>
  );
};

export default Bookings;
