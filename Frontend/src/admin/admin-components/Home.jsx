import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const Home = () => {
  const { user } = useAuth();
  return (
    <div className="flex justify-center items-center my-20">
      <div className="max-w-lg w-full p-6">
        <h1 className="text-3xl font-bold mb-4">Admin Home Page</h1>
        <div className="grid grid-cols-1 gap-4">
          <Link to="/admin/bookings">
            <div className="bg-gray-100 p-4 border border-zinc-400 hover:transition hover:scale-105 ease-in-out duration-300 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Manage Bookings</h2>
              <p>View, edit, or delete existing bookings.</p>
            </div>
          </Link>
          <Link to="/admin/hotelrooms">
            <div className="bg-gray-100 p-4 border border-zinc-400 hover:transition hover:scale-105 ease-in-out duration-300 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Add Rooms</h2>
              <p>Add new rooms to the hotel.</p>
            </div>
          </Link>
          <Link to="/admin/users">
            <div className="bg-gray-100 p-4 border border-zinc-400 hover:transition hover:scale-105 ease-in-out duration-300 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
              <p>View and manage user accounts.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
