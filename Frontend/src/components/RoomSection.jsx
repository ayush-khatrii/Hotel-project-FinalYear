import { useState, useEffect } from "react";
import Roomcard from "./Roomcard";
import { Link } from "react-router-dom";

const RoomSection = () => {
	const [rooms, setRooms] = useState([]);

	const fetchRoom = async () => {
		try {
			const response = await fetch("http://localhost:3000/rooms");
			const roomsData = await response.json();
			setRooms(roomsData);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchRoom();
	}, []);

	return (
		<section className='container mx-auto my-48 ' id='roomsection'>
			<div className='text-center'>
				<h1 className='text-2xl font-bold my-10 '>Our Rooms</h1>
			</div>
			<div className='grid  px-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
				{rooms.slice(0, 4).map((item) => (
					<Roomcard
						key={item._id}
						id={item._id}
						title={item.roomName}
						roomtype={item.roomType}
						imgurl={item.roomImages}
						desc={item.description}
						buttonText={item.isBooked ? "Booked" : "Book Now"}
					/>
				))}
			</div>
			<div className='show_more_btn text-center mt-12'>
				<Link
					to={"/rooms"}
					className='underline  text-red-500 text-center lg:text-xl  font-medium '
				>
					Show more
				</Link>
			</div>
		</section>
	);
};

export default RoomSection;
