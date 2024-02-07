import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Review from "../components/Review";
import { Minus, Plus } from "lucide-react";

const SingleRoom = () => {
	const [roomDetails, setRoomDetails] = useState({});
	const [reviews, setReviews] = useState([]);

	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [adults, setAdults] = useState(1);
	const [childern, setChildren] = useState(0);

	const { id } = useParams();

	const fetchRoom = async () => {
		try {
			const response = await fetch(`http://localhost:3000/rooms/${id}`);
			const roomsData = await response.json();
			setRoomDetails(roomsData);
			setReviews(roomsData.reviews);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchRoom();
	}, []);

	//   Handle Increment Decrement button clicks
	const handleAdultsDecrement = () => {
		setAdults((prevValue) => prevValue - 1);
	};
	const handleAdultsIncrement = () => {
		setAdults((prevValue) => prevValue + 1);
	};
	const handleChildernDecrement = () => {
		setChildren((prevValue) => prevValue - 1);
	};
	const handleChildernIncrement = () => {
		setChildren((prevValue) => prevValue + 1);
	};

	return (
		<div className='container mx-auto mt-20 py-10 px-10'>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
				<div>
					<img
						src={roomDetails.roomImages && roomDetails.roomImages[0]}
						alt={roomDetails.roomName}
						className='w-full h-96 object-cover mb-6 rounded-lg'
					/>
				</div>
				<div className='flex flex-col'>
					<h1 className='text-4xl font-bold mb-4'>{roomDetails.roomType}</h1>
					<p className='text-gray-600 mb-6'>{roomDetails.description}</p>
					<div className='flex items-start text-center  justify-center flex-col mb-6'>
						<p className='text-2xl font-bold text-gray-700'>
							Beds: {roomDetails.numberofbeds}
						</p>
						<p className='text-2xl font-bold text-gray-700'>
							Price: ${roomDetails.price}/night
						</p>
					</div>
					<div className='mb-6'>
						<p className='text-lg font-bold mb-2'>Amenities:</p>
						<ul className='flex flex-wrap gap-2 text-lg text-gray-600'>
							{roomDetails.ammenities?.map((amenity, index) => (
								<li key={index} className='rounded-full bg-gray-200 px-3 py-1'>
									{amenity}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
			<div className='check-in-out gap-5 flex flex-col md:flex-row justify-center items-center text-center my-20'>
				<div className='flex flex-col justify-center  items-start'>
					<label htmlFor=''>Check-In</label>
					<input type='date' className='border border-zinc-700 p-2' />
				</div>
				<div className='flex flex-col justify-center items-start'>
					<label htmlFor=''>Check-Out</label>
					<input type='date' className='border border-zinc-700 p-2' />
				</div>
				<div className='flex flex-col justify-center items-start'>
					<label htmlFor=''>Adults</label>
					<div className='border border-zinc-500 py-1 px-4 flex justify-center items-center gap-5'>
						<button
							onClick={handleAdultsDecrement}
							disabled={adults <= 1}
							className={`bg-gray-400 rounded-full  border-slate-200 p-2 cursor-pointer`}
						>
							<Minus />
						</button>
						<span className='font-bold text-xl '>{adults}</span>
						<button
							onClick={handleAdultsIncrement}
							className='bg-gray-400 rounded-full  border-slate-200 p-2 cursor-pointer'
						>
							<Plus />
						</button>
					</div>
				</div>
				<div className='flex flex-col justify-center items-start'>
					<label htmlFor=''>Childerns</label>
					<div className='border border-zinc-500 py-1 px-4 flex justify-center items-center gap-5'>
						<button
							disabled={childern <= 1}
							onClick={handleChildernDecrement}
							className='bg-gray-400  rounded-full  border-slate-200 p-2 cursor-pointer'
						>
							<Minus />
						</button>
						<span className='font-bold text-xl '>{childern}</span>
						<button
							onClick={handleChildernIncrement}
							className='bg-gray-400 rounded-full border-slate-200 p-2 cursor-pointer'
						>
							<Plus />
						</button>
					</div>
				</div>
			</div>
			<div className='flex justify-center items-center w-full'>
				<button className='p-2 bg-red-700 text-white rounded-md hover:bg-red-900'>
					Reserve or Book Now
				</button>
			</div>
			<Review reviews={reviews} roomId={id} />
		</div>
	);
};

export default SingleRoom;
