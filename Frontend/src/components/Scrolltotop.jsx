import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	const handleScroll = () => {
		setIsVisible(window.scrollY > 200); // sets value either - true or false
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		handleScroll();
		window.addEventListener("scroll", handleScroll);
	}, []);

	return (
		<>
			{isVisible && (
				<div
					className='fixed bottom-8 right-8 text-white bg-red-700 p-2 rounded-full cursor-pointer'
					onClick={scrollToTop}
				>
					<ChevronUp />
				</div>
			)}
		</>
	);
};
export default ScrollToTop;

