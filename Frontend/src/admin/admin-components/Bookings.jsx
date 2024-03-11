import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Users = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/bookings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const bookingsData = await response.json();
        setBookings(bookingsData);
        console.log(bookingsData);
      } catch (error) {
        console.error(error.message);
        // setError(error);
      }
    };

    getUser();
  }, []);
  return (
    <div className="flex pt-10 justify-center items-center">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Check-in Date</th>
            <th className="px-4 py-2">Check-out Date</th>
            <th className="px-4 py-2">Total Price</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="border px-4 py-2">{booking.user.username}</td>
              <td className="border px-4 py-2">
                {new Date(booking.checkindate).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">
                {new Date(booking.checkoutdate).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">{booking.totalPrice}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleEdit(booking._id)}
                >
                  Edit
                </button>
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
    </div>
  );
};

export default Users;
