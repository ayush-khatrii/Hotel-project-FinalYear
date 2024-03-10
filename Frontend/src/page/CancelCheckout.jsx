import { Link } from "react-router-dom";

const CancelCheckout = () => {
  return (
    <>
      <div className="text-center h-screen flex flex-col gap-5 justify-center items-center">
        <h1 className="text-zinc-900 font-bold  text-2xl w-1/2">
          Your payment has been canceled!!
        </h1>
        <Link to={"/"}>
          <button className="px-3 py-2 rounded bg-red-800 text-white">
            Go back to home
          </button>
        </Link>
      </div>
    </>
  );
};

export default CancelCheckout;
