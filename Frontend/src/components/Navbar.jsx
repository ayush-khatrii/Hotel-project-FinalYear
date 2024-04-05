import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  CircleUserRound,
  MenuIcon,
  User,
  ChevronRight,
  XIcon,
} from "lucide-react";

const menuList = [
  { path: "/", name: "Home" },
  { path: "/rooms", name: "Room" },
];

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { isLoggedIn, user } = useAuth();
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <nav className="fixed top-0 z-10 w-full bg-white shadow-md">
      <div className="container mx-auto px-5 sm:px-6 lg:px-20 ">
        <div className="flex items-center justify-between h-16 ">
          <div className="flex-shrink-0">
            <a href="/" className=" ">
              <img src={`/hotel-icon.png`} width={120} alt="" />
            </a>
          </div>
          <div className="md:hidden">
            <div className="flex justify-center gap-2">
              {isLoggedIn ? (
                <Link to={"/profile"}>
                  <div className=" py-2 px-2 flex justify-center items-center">
                    <CircleUserRound />
                  </div>
                </Link>
              ) : null}
              <button onClick={handleToggle} className="block">
                {toggle ? <XIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex justify-center items-center">
              {menuList.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className=" px-3 mx-3 rounded-md text-lg font-medium"
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex items-center justify-center w-full gap-3">
                {isLoggedIn ? (
                  user?.user?.isAdmin ? (
                    <Link to={"/admin"}>
                      <button className="flex justify-center items-center text-center gap-1 bg-red-700 text-white px-2 py-1 rounded">
                        Go to Dashboard <ChevronRight size={10} />
                      </button>
                    </Link>
                  ) : (
                    <Link to={"/profile"}>
                      <div className="py-1 px-3 flex justify-center items-center">
                        <User size={20} />
                      </div>
                    </Link>
                  )
                ) : (
                  <>
                    <Link to={"/login"}>
                      <button className="border text-red-500 border-red-700 lg:w-auto w-full px-2 py-1 font-medium rounded-md">
                        Login
                      </button>
                    </Link>
                    <Link to={"/signup"}>
                      <button className="text-white bg-red-700 lg:w-auto w-full px-2 py-1 text-base font-medium rounded-md">
                        Signup
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {toggle && (
        <div className="md:hidden">
          <div className=" pt-2 pb-3 space-y-3 flex flex-col justify-center items-start sm:px-3">
            {menuList.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className=" block px-3 py-2 rounded-md text-base font-medium"
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center justify-center w-full gap-3">
              {isLoggedIn ? (
                user?.user?.isAdmin ? (
                  <Link to={"/admin"}>
                    <button className="flex justify-center items-center text-center gap-1 bg-red-700 text-white px-2 py-1 rounded">
                      Go to Dashboard <ChevronRight size={10} />
                    </button>
                  </Link>
                ) : (
                  <Link to={"/profile"}>
                    <div className="py-1 px-3 flex justify-center items-center">
                      <User size={20} />
                    </div>
                  </Link>
                )
              ) : (
                <>
                  <Link to={"/login"}>
                    <button className="border text-red-500 border-red-700 lg:w-auto w-full px-2 py-1 font-medium rounded-md">
                      Login
                    </button>
                  </Link>
                  <Link to={"/signup"}>
                    <button className="text-white bg-red-700 lg:w-auto w-full px-2 py-1 text-base font-medium rounded-md">
                      Signup
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
