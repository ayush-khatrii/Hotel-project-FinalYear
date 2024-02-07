import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileButton from "./Profile";
import { CircleUser, CircleUserRound, User } from "lucide-react";
const menuList = [
	{ path: "/", name: "Home" },
	{ path: "/rooms", name: "Room" },
];

const Navbar = () => {
	const [toggle, setToggle] = useState(false);
	const { isLoggedIn, user } = useAuth();

	const handleToggle = () => {
		setToggle(!toggle);
	};

	return (
		<nav className='fixed top-0 z-10 w-full bg-white shadow-md'>
			<div className='container mx-auto px-5 sm:px-6 lg:px-20 '>
				<div className='flex items-center justify-between h-16 '>
					<div className='flex-shrink-0'>
						<a href='/' className=' text-2xl font-black'>
							MH
						</a>
					</div>
					<div className='md:hidden'>
						<div className='flex justify-center gap-2'>
							{isLoggedIn ? (
								<Link to={"/profile"}>
									<div className=' py-2 px-2 flex justify-center items-center'>
										<CircleUserRound />
									</div>
								</Link>
							) : null}
							<button onClick={handleToggle} className='block'>
								{toggle ? (
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-6 w-6'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path
											fillRule='evenodd'
											d='M3.293 4.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z'
											clipRule='evenodd'
										/>
									</svg>
								) : (
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										className='h-6 w-6'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M4 6h16M4 12h16m-7 6h7'
										/>
									</svg>
								)}
							</button>
						</div>
					</div>
					<div className='hidden md:block'>
						<div className='flex  justify-center items-center'>
							{menuList.map((item, index) => (
								<Link
									key={index}
									to={item.path}
									className=' px-3 mx-3 rounded-md text-lg font-medium'
								>
									{item.name}
								</Link>
							))}

							<div className='flex items-center justify-center w-full gap-3 '>
								{isLoggedIn ? (
									<>
										<Link to={"/profile"}>
											<div className='py-1 px-3 flex justify-center items-center '>
												<User size={20} />
											</div>
										</Link>
									</>
								) : (
									<>
										<Link to={"/login"}>
											<button className=' border text-red-500 border-red-700 lg:w-auto w-full px-2 py-1    font-medium rounded-md '>
												Login
											</button>
										</Link>
										<Link to={"/signup"}>
											<button className='  text-white bg-red-700 lg:w-auto w-full px-2 py-1 text-base  font-medium rounded-md '>
												Signup
											</button>
										</Link>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			{toggle && (
				<div className='md:hidden'>
					<div className=' pt-2 pb-3 space-y-3 flex flex-col justify-center items-start sm:px-3'>
						{menuList.map((item, index) => (
							<a
								key={index}
								href={item.path}
								className=' block px-3 py-2 rounded-md text-base font-medium'
							>
								{item.name}
							</a>
						))}
						<div className='flex flex-col px-3 w-full gap-3 '>
							{isLoggedIn == true ? null : (
								<>
									<Link to={"/login"}>
										<button className=' border text-red-500 border-red-700 lg:w-auto w-full px-2 py-1    font-medium rounded-md '>
											Login
										</button>
									</Link>
									<Link to={"/signup"}>
										<button className='  text-white bg-red-700 lg:w-auto w-full px-2 py-1 text-base  font-medium rounded-md '>
											Signup
										</button>
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
