const RestaurantSection = () => {
	return (
		<section className='my-32'>
			<div className='container mx-auto md:px-10 px-8 lg:px-20'>
				<h2 className='text-2xl font-bold lg:my-20 my-10  text-center '>
					Welcome to Our Hotel's Restaurant
				</h2>
				<div className='grid items-center lg:items-start grid-cols-1 md:grid-cols-2 gap-8'>
					<div className='bg-white rounded-lg overflow-hidden'>
						<img
							src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
							alt='Restaurant'
							className='w-full object-cover'
						/>
					</div>
					<div>
						<h3 className='text-2xl font-bold mt-8 mb-4'>
							About Our Restaurant
						</h3>
						<p className='text-zinc-800 text- mb-6'>
							Our hotel's restaurant offers a delightful dining experience with
							a wide variety of cuisines. From exquisite starters to
							mouth-watering main courses, enjoy a memorable dining experience
							with us.
						</p>
						<p className='text-zinc-800 text- mb-6'>
							Book a table for a romantic dinner, a casual get-together, or a
							family celebration. Explore our menu and discover delectable
							dishes prepared by our talented chefs.
						</p>
						<div className='flex space-x-4'>
							<a
								href='#'
								className='flex-1 bg-red-700 text-white text-center py-2 rounded-md font-semibold hover:bg-red-00 transition duration-300'
							>
								Book a Table
							</a>
							<a
								href='#'
								className='flex-1 border border-red-700 text-red-700 text-center py-2 rounded-md font-semibold hover:bg-red-100 transition duration-300'
							>
								View Menu
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default RestaurantSection;
