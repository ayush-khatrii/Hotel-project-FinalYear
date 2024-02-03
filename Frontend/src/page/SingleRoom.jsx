import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Review from "../components/Review";

const SingleRoom = () => {
	const [roomDetails, setRoomDetails] = useState({});
	const [reviews, setReviews] = useState([]);

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
					<button className='px-6 py-3 bg-red-700 text-white rounded-md hover:bg-red-900'>
						Reserve or Book Now
					</button>
				</div>
			</div>
			<Review reviews={reviews} roomId={id} />
		</div>
	);
};

export default SingleRoom;
