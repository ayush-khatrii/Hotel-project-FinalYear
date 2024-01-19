import { Link } from "react-router-dom";

const Roomcard = ({ id, title, roomtype, imgurl, desc, buttonText }) => {
	return (
		<div className='p-4'>
			<div className='h-full border border-gray-400 border-opacity-60 rounded-lg overflow-hidden'>
				<img
					className='lg:h-48 md:h-36 w-full object-cover'
					src={imgurl}
					alt='Room'
				/>
				<div className='p-6'>
					<h2 className='text-xs text-gray-400 mb-1'>{roomtype}</h2>
					<h1 className='text-lg font-medium text-gray-900 mb-3'>{title}</h1>
					<p className='mb-5'>{desc}</p>
					{/* <Link
						to={`/rooms/${id}`}
						className={`${
							buttonText === "Booked"
								? "bg-zinc-200 text-gray-400 disabled cursor-not-allowed"
								: "bg-red-700 text-white cursor-pointer"
						} mt-5 px-4 py-2 rounded-md font-medium`}
						disabled={buttonText === "Booked"}
					>
						{buttonText}
					</Link> */}
					{buttonText === "Booked" ? (
						<div className='bg-zinc-200 w-fit text-gray-400 cursor-not-allowed mt-5 px-4 py-2 rounded-md font-medium'>
							{buttonText}
						</div>
					) : (
						<Link
							to={`/rooms/${id}`}
							className='bg-red-700 text-white cursor-pointer mt-5 px-4 py-2 rounded-md font-medium'
						>
							{buttonText}
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default Roomcard;
