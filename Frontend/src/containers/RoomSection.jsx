import { useState, useEffect } from "react";
import Roomcard from "../components/Roomcard";
import { Link } from "react-router-dom";

const RoomSection = () => {
	const [booked, setbooked] = useState(false);
	const [buttonText, setbuttonText] = useState("");

	useEffect(() => {
		setbuttonText(booked ? "Booked" : "Book Now");
	}, [booked]);

	const data = [
		{
			id: 1,
			name: "Luxury Room",
			type: "Luxury",
			description: "Spacious luxury room with a mountain view.",
			available: true,
		},
		{
			id: 2,
			name: "Basic Room",
			type: "Basic",
			description: "Cozy basic room for a comfortable stay.",
			available: true,
		},
		{
			id: 3,
			name: "Suite Room",
			type: "Suite",
			description: "Elegant suite room with additional amenities.",
			available: false,
		},
		{
			id: 3,
			name: "Suite Room",
			type: "Suite",
			description: "Elegant suite room with additional amenities.",
			available: false,
		},
	];

	return (
		<section className='container mx-auto my-48 ' id='roomsection'>
			<div className='text-center'>
				<h1 className='text-2xl font-bold my-10 '>Our Rooms</h1>
			</div>
			<div className='grid  px-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
				{data.map((item) => (
					<Roomcard
						key={item.id}
						title={item.name}
						roomtype={item.type}
						imgurl={`https://via.placeholder.com/800x600.png?text=${item.name}`}
						desc={item.description}
						buttonText={buttonText}
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
