import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Rooms = () => {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [searchInput, setSearchInput] = useState("");
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

	if (rooms.length < 0) {
		<span className='font-bold text-xl'>Loading.....</span>;
	}

	const handleFilter = (e) => {
		const val = e.target.value;
		setSelectedCategory(val);
	};

	const handleSearch = (e) => {
		const val = e.target.value.toLowerCase();
		setSearchInput(val);
	};

	const filteredCategory = rooms.filter((item) => {
		const isSelectedCategory =
			selectedCategory === "All" || item.roomType === selectedCategory;

		const isMatchingSearch =
			item.roomName.toLowerCase().includes(searchInput) ||
			item.roomType.toLowerCase().includes(searchInput) ||
			item.ammenities.some((amenity) =>
				amenity.toLowerCase().includes(searchInput)
			);

		return isSelectedCategory && isMatchingSearch;
	});

	return (
		<div className=''>
			<div className='container mx-auto py-5 lg:px-20 px-10'>
				{/* Filter Section */}
				<div className='flex justify-center mb-8'>
					<select
						onChange={handleFilter}
						className='rounded-md border border-black px-4 py-2 mr-4'
					>
						<option value='All'>All</option>
						<option value='Luxury'>Luxury</option>
						<option value='Basic'>Basic</option>
						<option value='Suite'>Suite</option>
					</select>
					<div className='relative'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-700 left-3'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
							/>
						</svg>
						<input
							type='text'
							placeholder='Search'
							onChange={handleSearch}
							className='w-full py-3 pl-12 pr-4 text-gray-500 border border-neutral-600 rounded-md outline-none '
						/>
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{filteredCategory.map((room) => (
						<div
							key={room._id}
							className='bg-white  rounded overflow-hidden shadow-lg '
						>
							<img
								src={room.roomImages}
								alt={room.roomName}
								className='w-full h-64 object-cover'
							/>
							<div className='p-6 '>
								<span className='flex mb-3 items-center justify-between text-center gap-5'>
									<h2 className='text-xl font-semibold'>{room.roomName}</h2>
									<p className=' text-sm text-gray-500'>{room.roomType}</p>
								</span>
								<p className='text-gray-600 mb-4'>{room.description}</p>
								<div className='mb-4'>
									<p className='text-sm font-semibold mb-1'>Amenities:</p>
									<ul className='flex flex-wrap gap-2 text-sm text-gray-600'>
										{room.ammenities.map((amenity, index) => (
											<li
												key={index}
												className='rounded-full bg-gray-200 px-2 py-1'
											>
												{amenity}
											</li>
										))}
									</ul>
								</div>
								<div className='mt-5 flex justify-between items-center text-center'>
									<span className='font-bold text-xl  '>₹{room.price}</span>
									{room.isBooked ? (
										<button
											className='px-4 py-2 bg-red-700 text-white rounded-md
											cursor-not-allowed opacity-50'
										>
											Booked
										</button>
									) : (
										<Link
											to={`/rooms/${room._id}`}
											className='px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-900 cursor-pointer'
										>
											Book Now
										</Link>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Rooms;
