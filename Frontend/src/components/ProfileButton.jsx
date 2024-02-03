import React from "react";
import { useAuth } from "../context/AuthContext";

const ProfileButton = () => {
	const { logoutUser } = useAuth();
	return (
		<>
			<div className='relative inline-block text-left'>
				<button
					onClick={logoutUser}
					className='  text-white bg-red-700 lg:w-auto w-full px-2 py-1 text-base  font-medium rounded-md'
				>
					Logout
				</button>
			</div>
		</>
	);
};

export default ProfileButton;
