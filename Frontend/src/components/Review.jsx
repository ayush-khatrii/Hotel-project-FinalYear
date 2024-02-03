import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Review = ({ reviews, roomId }) => {
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const { isLoggedIn, token } = useAuth();

	const handlePostReview = async (e) => {
		e.preventDefault();

		if (!isLoggedIn) {
			alert("Please login first to review this room! ");
			return;
		}

		try {
			const response = await fetch(`http://localhost:3000/reviews/${roomId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					rating: rating,
					comment: comment,
				}),
			});

			const data = await response.json();

			alert(data.message);
			window.location.reload();
			if (!response.ok) {
				console.error("Failed to post review");
			}
		} catch (error) {
			console.error(error.message);
			alert(error.message);
		}
	};

	const handleStarClick = (starCount) => {
		setRating(starCount);
	};

	return (
		<div className='mt-52'>
			<form
				onSubmit={handlePostReview}
				className='w-full rounded-lg p-2 mx-auto mt-20 mb-10'
			>
				<div className='px-3 mb-20 mt-2'>
					<h1 className='font-bold py-2 '>Rate this room</h1>
					<div className='flex justify-start gap-6 text-4xl'>
						{[1, 2, 3, 4, 5].map((starCount) => (
							<span
								key={starCount}
								className={`cursor-pointer ${
									rating >= starCount ? "text-yellow-500" : ""
								}`}
								onClick={() => handleStarClick(starCount)}
							>
								&#9733;
							</span>
						))}
					</div>
				</div>
				<div className='px-3 mb-2 mt-2'>
					<h1 className='font-bold py-2 '>Review this room</h1>
					<textarea
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder='comment'
						required
						className='w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium focus:outline-none'
					></textarea>
				</div>
				<div className='flex justify-start px-4'>
					<input
						type='submit'
						className='px-2.5 py-1.5 rounded cursor-pointer text-white text-sm bg-red-600'
						value='Submit'
					/>
				</div>
			</form>
			{reviews &&
				reviews.map((review) => (
					<div className='list-reviews flex flex-col px-3' key={review._id}>
						<div className='flex items-center gap-2'>
							<h1 className='font-bold'>{review.user?.username}</h1>|
							<span>{review.rating} &#9733;</span>
						</div>
						<p>{review.comment}</p>
						<br className='visible-br text-black' />
					</div>
				))}
		</div>
	);
};

export default Review;
