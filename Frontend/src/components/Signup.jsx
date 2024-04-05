import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
export default () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await register(username, email, password);

      setSuccessMessage("Registeration successful!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("SignUp Error : " + error);
    }
  };

  return (
    <>
      <main className="w-full  h-screen flex flex-col items-center justify-center lg:px-4 px-5 ">
        <div className="max-w-sm w-full  space-y-5">
          <div className="text-center pb-8">
            <a className="text-5xl font-black" href="/">
              Maruti Hotel
            </a>
            <div className="mt-5">
              <h3 className="text-gray-800  font-bold sm:text-xl">
                Create New Account
              </h3>
            </div>
          </div>
          <form onSubmit={handleRegister} className="space-y-2">
            <div>
              <label className="font-medium">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full mt-2 px-3 py-2  bg-transparent outline-none border border-zinc-500 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                value={email}
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
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-2 px-3 py-2  bg-transparent outline-none border border-zinc-500 shadow-sm rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between text-sm"></div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-800 rounded-lg duration-150"
            >
              Create account
            </button>
          </form>
          <p className="text-center">
            Already have an account ?
            <Link to="/login" className="font-medium text-red-600 ">
              Login
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};
