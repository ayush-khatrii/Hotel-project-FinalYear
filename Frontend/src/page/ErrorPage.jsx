import { Link } from "react-router-dom";
const ErrorPage = () => {
	return (
		// <div className='h-screen flex justify-center items-center text-center text-black font-black'>
		// 	404 NOT FOUND!
		// </div>
		<div className='flex flex-col items-center justify-center h-screen bg-black text-white'>
			<h1 className='text-6xl font-bold mb-8'>404</h1>
			<p className='text-lg mb-8'>Oops! Page not found.</p>
			<div className='flex space-x-4'>
				<Link
					to={"/"}
					className='bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
				>
					Back to Home Page
				</Link>
			</div>
		</div>
	);
};

export default ErrorPage;
