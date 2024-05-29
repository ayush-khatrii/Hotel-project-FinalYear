import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { Chip } from "@nextui-org/react";


const allAmenities = [
  {
    id: 1,
    name: "Wifi",
    checked: false
  },
  {
    id: 2,
    name: "AC",
    checked: false
  },
  {
    id: 3,
    name: "TV",
    checked: false
  },
  {
    id: 4,
    name: "Fridge",
    checked: false
  },
  {
    id: 5,
    name: "Refrigerator",
    checked: false
  },
  {
    id: 6,
    name: "sample",
    checked: false
  },
]

const Rooms = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [rooms, setRooms] = useState([]);
  const [amenities, setAmenities] = useState("");
  const [roomType, setRoomType] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);


  const fetchRoom = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/rooms`);
      const roomsData = await response.json();
      console.log(roomsData);
      setRooms(roomsData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  const handleFilter = (e) => {
    const val = e.target.value;
    setSelectedCategory(val);
  };

  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase();
    setSearchInput(val);
  };


  return (
    <>
      <Toaster />
      <div className="h-full">
        <div className="container mx-auto mt-20 py-5 lg:px-20 px-10">
          <div className="flex justify-center items-center mb-8">
            <div className="flex justify-start flex-col ml-4">
              <label htmlFor="category">Filter by category</label>
              <select
                id="category"
                onChange={handleFilter}
                className="border rounded border-black px-4 py-2"
              >
                <option value="all">All</option>
                <option value="luxury">Luxury</option>
                <option value="basic">Basic</option>
                <option value="suite">Suite</option>
              </select>
            </div>
            <div className="flex">
              <div className="flex justify-start flex-col ml-4">
                <label htmlFor="minprice">Minimum</label>
                <input
                  id="minprice"
                  type="text"
                  className="border rounded border-black px-4 py-2"
                  placeholder=""
                />
              </div>
              <div className="flex justify-start flex-col ml-4">
                <label htmlFor="maxprice">Maximum</label>
                <input
                  id="maxprice"
                  type="text"
                  className="border rounded border-black px-4 py-2"
                  placeholder=""
                />
              </div>
            </div>
            <div className="">
              <h1>Amenities</h1>
              {/* <div className="grid grid-cols-2 place-items-center">
                <select className="border mx-5 rounded border-black px-4 py-2" name="" id="">
                  {
                    allAmenities.map((amenity) => (
                      <span key={amenity.id}>
                        <input type="checkbox" name="" id="" />
                        <option value={amenity.name}>{amenity.name}</option>
                      </span>
                    ))
                  }
                </select>
              </div> */}
            </div>

          </div>


          <div className="flex flex-col justify-center items-center gap-6">
            {/* Container for room cards */}
            <div className="w-full">
              {rooms?.map((room) => (
                <div
                  key={room._id}
                  className="bg-white rounded  border border-zinc-400 mb-6 flex flex-col-reverse lg:flex-row"
                >
                  <div className="w-full lg:w-1/2  lg:order-1">
                    <div className="p-5">
                      <span className="flex flex-row mb-3 items-center justify-between text-center ">
                        <h2 className="text-xl font-semibold">
                          {room.roomType}
                        </h2>
                      </span>
                      <p className="text-gray-600 mb-4">{room.description}</p>
                      <div className="mb-4">
                        <p className="text-sm font-semibold mb-1">Amenities:</p>
                        <ul className="flex flex-wrap gap-2 text-sm text-gray-600">
                          {room.amenities.map((amenity, index) => (
                            <Chip
                              key={index}
                              color="default"
                            >
                              {amenity}
                            </Chip>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-5 flex justify-between items-center text-center">
                        <span className="font-bold text-xl">₹{room.price}</span>
                        {room.isBooked ? (
                          <button className="px-4 py-2 rounded bg-red-700 text-white -md cursor-not-allowed opacity-50">
                            Booked
                          </button>
                        ) : (
                          <Link
                            to={`/rooms/${room._id}`}
                            className="px-4 py-2 rounded bg-red-700 text-white -md hover:bg-red-900 cursor-pointer"
                          >
                            Book Now
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2">
                    <div className="review absolute">
                      <div className="relative bg-black text-white px-5">
                        {room.reviews[0]?.rating} &#9733;
                      </div>
                    </div>
                    <img
                      src={room.roomImages}
                      alt={room.roomType}
                      className="w-full h-64 object-cover "
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default Rooms;
