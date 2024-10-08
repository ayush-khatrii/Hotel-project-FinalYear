import { useState, useEffect } from "react";
import Roomcard from "./Roomcard";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const RoomSection = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRoom = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/rooms`);
      const roomsData = await response.json();
      setRooms(roomsData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  if (isLoading) {
    return <div className="text-center my-10 font-bold flex justify-center items-center  text-2xl">Loading...</div>;
  }
  return (
    <>
      <Toaster />
      <section className="container mx-auto my-48 " id="roomsection">
        <div className="text-center">
          <h1 className="text-2xl font-bold my-10 ">Our Rooms</h1>
        </div>
        <div className="grid  px-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {rooms.slice(0, 4).map((item) => (
            <Roomcard
              key={item._id}
              id={item._id}
              title={item.roomName}
              roomtype={item.roomType}
              imgurl={item.roomImages}
              desc={item.description}
              buttonText={item.isBooked ? "Booked" : "Book Now"}
            />
          ))}
        </div>
        <div className="show_more_btn text-center mt-12">
          <Link
            to={"/rooms"}
            className="underline  text-red-500 text-center lg:text-xl  font-medium "
          >
            Show more
          </Link>
        </div>
      </section>
    </>
  );
};

export default RoomSection;
