import React from "react";
import { useAuth } from "../context/AuthContext";
import { Edit } from "lucide-react";

const Profile = () => {
	const { logoutUser, user } = useAuth();
	return (
		<>
			<div className='container px-10 mx-auto max-w-7xl h-screen my-20'>
				<div className='mt-10 '>
					<div className='flex flex-col'>
						<div className='flex justify-start gap-10 items-center'>
							<h1 className='font-bold text-xl my-5'>Personal Information</h1>
							<span className='cursor-pointer text-blue-600 '>
								<Edit size={20} />
							</span>
						</div>
						<div className='flex flex-col justify-center item-center text-center'>
							<div className='flex '>
								<h1 className='font-bold text-gray-800 text-xl mr-3'>Name :</h1>
								<p className='items-center capitalize text-center text-xl'>
									{user?.user?.username}
								</p>
							</div>
							<div className='flex '>
								<h1 className='font-bold text-gray-800 text-xl mr-3'>
									Email :
								</h1>
								<p className='items-center  text-center text-xl'>
									{user?.user?.email}
								</p>
							</div>
						</div>
					</div>
					<div className='flex flex-col'>
						<h1 className='font-bold text-xl my-5'>Your Bookings</h1>
						<div className='flex flex-col justify-center item-center text-center'>
							<div className='flex gap-5  bg-gray-300 flex-col sm:flex-row lg:justify-start lg:items-start'>
								<img
									src='https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww'
									alt=''
									className='w-full sm:w-1/4 h- object-cover'
								/>
								<div>
									<h1 className='font-bold mt-5 text-xl'>
										This is booking title
									</h1>
									<h1>This is booking details</h1>
									<span>₹500</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<button
					onClick={logoutUser}
					className='text-white bg-red-700 px-2 py-1 text-base  mt-10 font-medium rounded'
				>
					Logout
				</button>
			</div>
		</>
	);
};

export default Profile;
