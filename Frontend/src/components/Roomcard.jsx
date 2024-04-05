import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Roomcard = ({ id, title, roomtype, imgurl, desc, buttonText }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleClick = () => {
    if (!user) {
      alert("Please login first!!");
      return;
    } else {
      navigate(`/rooms/${id}`);
    }
  };

  return (
    <div className="p-4">
      <div className="h-full border border-gray-400 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover"
          src={imgurl}
          alt="Room"
        />
        <div className="p-6">
          <h2 className="text-xs text-gray-400 mb-1">{roomtype}</h2>
          <h1 className="text-lg font-medium text-gray-900 mb-3">{title}</h1>
          <p className="mb-5">{desc}</p>

          {buttonText === "Booked" ? (
            <div
              onClick={handleClick}
              className="bg-zinc-200 w-fit text-gray-400 cursor-not-allowed mt-5 px-4 py-2 rounded-md font-medium"
            >
              {buttonText}
            </div>
          ) : (
            <button
              onClick={handleClick}
              className="bg-red-700 text-white cursor-pointer mt-5 px-4 py-2 rounded-md font-medium"
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roomcard;
