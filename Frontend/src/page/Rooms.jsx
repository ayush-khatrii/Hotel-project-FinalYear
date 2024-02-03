import { useState, useEffect, useContext } from "react";
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
			item.roomType.toLowerCase().includes(searchInput) ||
			item.ammenities.some((amenity) =>
				amenity.toLowerCase().includes(searchInput)
			);

		return isSelectedCategory && isMatchingSearch;
	});

	return (
		<div className=''>
			<div className='container mx-auto mt-20 py-5 lg:px-20 px-10'>
				<div className='flex justify-center mb-8'>
					<select
						onChange={handleFilter}
						className='-md border rounded border-black px-4 py-2 mr-4'
					>
						<option value='All'>All</option>
						<option value='luxury'>Luxury</option>
						<option value='basic'>Basic</option>
						<option value='suite'>Suite</option>
					</select>
					<div className='relative'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='absolute top-0 bottom-0 w-6 h-6 my-auto  text-gray-700 left-3'
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
							className='w-full py-3 pl-12 pr-4 text-gray-500 border rounded border-neutral-600 -md outline-none '
						/>
					</div>
				</div>

				<div className='flex flex-col justify-center items-center gap-6'>
					{/* Container for room cards */}
					<div className='w-full'>
						{filteredCategory.map((room) => (
							<div
								key={room._id}
								className='bg-white rounded  border border-zinc-400 mb-6 flex flex-col-reverse lg:flex-row'
							>
								<div className='w-full lg:w-1/2  lg:order-1'>
									<div className='p-5'>
										<span className='flex flex-row mb-3 items-center justify-between text-center '>
											<h2 className='text-xl font-semibold'>{room.roomType}</h2>
										</span>
										<p className='text-gray-600 mb-4'>{room.description}</p>
										<div className='mb-4'>
											<p className='text-sm font-semibold mb-1'>Amenities:</p>
											<ul className='flex flex-wrap gap-2 text-sm text-gray-600'>
												{room.ammenities.map((amenity, index) => (
													<li
														key={index}
														className='rounded bg-gray-200 px-2 py-1'
													>
														{amenity}
													</li>
												))}
											</ul>
										</div>
										<div className='mt-5 flex justify-between items-center text-center'>
											<span className='font-bold text-xl'>₹{room.price}</span>
											{room.isBooked ? (
												<button className='px-4 py-2 rounded bg-red-700 text-white -md cursor-not-allowed opacity-50'>
													Booked
												</button>
											) : (
												<Link
													to={`/rooms/${room._id}`}
													className='px-4 py-2 rounded bg-red-700 text-white -md hover:bg-red-900 cursor-pointer'
												>
													Book Now
												</Link>
											)}
										</div>
									</div>
								</div>
								<div className='w-full lg:w-1/2'>
									<div className='review absolute'>
										<div className='relative bg-black text-white px-5'>
											{room.reviews[0]?.rating} &#9733;
										</div>
									</div>
									<img
										src={room.roomImages}
										alt={room.roomType}
										className='w-full h-64 object-cover '
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Rooms;
