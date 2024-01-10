import { useState } from "react";
import { Link } from "react-router-dom";

const Rooms = () => {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [searchInput, setSearchInput] = useState("");
	const rooms = [
		{
			id: 1,
			name: "Luxury Room",
			type: "Luxury",
			description: "Spacious luxury room with a view.",
			available: true,
			price: 3000,
			amenities: ["King-sized Bed", "Jacuzzi", "Minibar"],
		},
		{
			id: 2,
			name: "New Latest Luxury Room",
			type: "Luxury",
			description: "New Spacious luxury room with a gardern view.",
			available: true,
			price: 3000,
			amenities: ["King-sized Bed", "Jacuzzi", "Minibar"],
		},
		{
			id: 3,
			name: "Basic Room",
			type: "Basic",
			price: 3000,
			description: "Cozy basic room for a comfortable stay.",
			available: true,
			amenities: ["Double Bed", "TV", "WiFi"],
		},
		{
			id: 4,
			name: "Suite Room",
			type: "Suite",
			price: 3000,
			description: "Elegant suite room with additional amenities.",
			available: true,
			amenities: ["Master Bedroom", "Living Area", "Balcony"],
		},
		{
			id: 5,
			name: "Sample Room",
			type: "Suite",
			price: 3000,
			description: "Elegant suite room with additional amenities.",
			available: true,
			amenities: ["Master Bedroom", "Living Area", "Balcony"],
		},
	];

	const handleRoomSelect = (roomId) => {
		alert(`Room ${roomId} selected`);
	};
	const handleFilter = (e) => {
		const val = e.target.value;
		setSelectedCategory(val);
		console.log(val);
	};

	const handleSearch = (e) => {
		// setSearchInput(e.target.value);
		const val = e.target.value.toLowerCase();
		console.log(val);
		setSearchInput(val);
	};

	// const filteredCategory = rooms.filter((item) => {
	// 	if (selectedCategory === "All" ) {
	// 		return true;
	// 	} else {
	// 		return item.type === selectedCategory;
	// 	}
	// });

	const filteredCategory = rooms.filter((item) => {
		const isSelectedCategory =
			selectedCategory === "All" || item.type === selectedCategory;
		const isMatchingSearch =
			item.name.toLowerCase().includes(searchInput) ||
			item.type.toLowerCase().includes(searchInput) ||
			item.amenities.some((ammenity) =>
				ammenity.toLowerCase().includes(searchInput)
			);

		return isSelectedCategory && isMatchingSearch;
	});

	return (
		<div className=''>
			<div className='container mx-auto py-5 lg:px-20 px-10'>
				<div className='flex w-full  justify-between mb-10'>
					<h1 className='text-xl font-bold mb-8 '>Explore Our Rooms</h1>
					<div>
						<ul className='flex justify-center items-center text-center gap-6'>
							<li className='text-lg font-bold mb-8'>
								<Link to='/'>Home</Link>
							</li>
							<li className='text-lg font-bold mb-8'>
								<Link to='/rooms'>Rooms</Link>
							</li>
							<li className='text-lg font-bold mb-8'>
								<Link to='/menu'>Menu</Link>
							</li>
							<button className='font-bold mb-8 bg-red-700 text-white px-2 py-1 rounded-md'>
								<Link to='/bookings'>Bookings</Link>
							</button>
						</ul>
					</div>
				</div>

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
							key={room.id}
							className='bg-white rounded-lg overflow-hidden shadow-md border border-gray-300'
						>
							<img
								src={`https://via.placeholder.com/800x600.png?text=${room.name}`}
								alt={room.name}
								className='w-full h-64 object-cover'
							/>
							<div className='p-6 '>
								<span className='flex mb-3 items-center justify-between text-center gap-5'>
									<h2 className='text-xl font-semibold'>{room.name}</h2>
									<p className=' text-sm text-gray-500'>{room.type}</p>
								</span>
								<p className='text-gray-600 mb-4'>{room.description}</p>
								<div className='mb-4'>
									<p className='text-sm font-semibold mb-1'>Amenities:</p>
									<ul className='flex flex-wrap gap-2 text-sm text-gray-600'>
										{room.amenities.map((amenity, index) => (
											<li
												key={index}
												className='rounded-full bg-gray-200 px-2 py-1'
											>
												{amenity}
											</li>
										))}
									</ul>
								</div>
								<div className='flex justify-between items-center'>
									<span className='flex-1'>{room.price}</span>
									<button
										onClick={() => handleRoomSelect(room.id)}
										disabled={!room.available}
										className={`px-4 py-2 bg-red-700 text-white rounded-md ${
											room.available
												? "hover:bg-red-900 cursor-pointer"
												: "opacity-50 cursor-not-allowed"
										}`}
									>
										{room.available ? "Book Now" : "Not Available"}
									</button>
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
