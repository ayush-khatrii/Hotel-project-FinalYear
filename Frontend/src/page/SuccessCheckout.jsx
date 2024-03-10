import { Link } from "react-router-dom";

const CancelCheckout = () => {
  return (
    <>
      <div className="text-center h-screen flex flex-col gap-5 justify-center items-center">
        <h1 className="text-zinc-800 text-2xl font-bold">
          Payment successfull! 🎉
        </h1>
        <Link to={"/"}>
          <button className="px-3 py-2 rounded bg-green-800 text-white">
            Go back to home
          </button>
        </Link>
      </div>
    </>
  );
};

export default CancelCheckout;
