import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext, { useAuth } from "../context/AuthContext";
import { Toaster, toast } from "react-hot-toast";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const [nonAuthRoomID, setNonAuthRoomID] = useState("");

  useEffect(() => {
    const nonauthroomId = localStorage.getItem("non-auth-bookings");
    setNonAuthRoomID(nonauthroomId);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Login Successful");

      if (nonAuthRoomID) {
        navigate(`/rooms/${nonAuthRoomID}`);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Login error:", error.message);
    }
  };

  return (
    <>
      <Toaster />

      <main className="w-full h-screen flex flex-col items-center justify-center lg:px-4 px-5 ">
        <div className="max-w-sm w-full  space-y-5">
          <div className="text-center pb-8">
            <a className="text-5xl font-black" href="/">
              Maruti Hotel
            </a>
            <div className="mt-5">
              <h3 className="text-gray-800  font-bold sm:text-xl">
                Log in to your account
              </h3>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-2">
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-2 px-3 py-2  bg-transparent outline-none border border-zinc-500 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                value={password}
                minLength={8}
                maxLength={20}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-2 px-3 py-2  bg-transparent outline-none border border-zinc-500 shadow-sm rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between text-sm"></div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-center text-white font-medium bg-red-600 hover:bg-red-800 rounded-lg duration-150 block"
            >
              Login
            </button>
          </form>

          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-red-600 ">
              Sign up
            </Link>
          </p>
          <p className="text-center">
            Login as Admin {""}
            <Link
              to="/admin-login"
              className="font-medium underline text-blue-600 "
            >
              Admin Login
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};
