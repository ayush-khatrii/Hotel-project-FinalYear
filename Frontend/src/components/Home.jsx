import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <section className="container mb-20 mx-auto lg:px-8 flex flex-col lg:flex-row justify-around items-center mt-28 ">
        <div className="hero-section flex justify-center gap-3 items-start text-left flex-col px-4 lg:w-1/2  mb-10 lg:mb-0">
          <h1 className="text-5xl text-gray-900 lg:text-5xl font-black">
            Explore Our Exquisite Hotel
          </h1>
          <p className="text-3xl lg:text-4xl text-gray-800 font-normal my-2 ">
            Enjoy lavish stays, delicious dining, and unforgettable events.
            Experience luxury like never before!
          </p>
          <div className="cta w-full flex   flex-col gap-3 lg:flex-row ">
            <Link
              to={"/rooms"}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-300 text-white bg-red-600 px-5 py-2.5 text-center"
            >
              Book Now
            </Link>
            <a
              href="#roomsection"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400"
            >
              Explore
            </a>
          </div>
        </div>
        <div className="grid_gallery flex flex-col px-10 lg:px-0">
          <div className="md:grid hidden ">
            <div className="rounded overflow-hidden mb-2 h-80 cursor-pointer ">
              <img
                src="/hotel-nightview.webp"
                alt=""
                className="rounded-lg w-full hover:scale-110 object-cover  transition ease-in duration-400 h-96"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 h-40  cursor-pointer">
              <div className="rounded overflow-hidden">
                <img
                  src="/hotelimg.webp"
                  className="rounded-lg w-full h-40 hover:scale-105 transition ease-in duration-400  object-cover hover:object-cover "
                  alt=""
                />
              </div>
              <div className="rounded overflow-hidden">
                <img
                  src="/restaurant.webp"
                  className="rounded-lg w-full h-40 hover:scale-105 transition ease-in duration-400  object-cover "
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
