import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [fetchReviews, setFetchReviews] = useState([]);

  const { isLoggedIn, token, user } = useAuth();
  const { id } = useParams();

  const fetchReview = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/rooms/${id}`);
      const roomsData = await response.json();
      setFetchReviews(roomsData.reviews);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchReview();
  }, []);

  const handlePostReview = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.error("Please login first to review this room! ");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/reviews/${id}`, {
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

      toast.success(data.message, { duration: 2000 });
      if (!response.ok) {
        toast.error("Failed to post review");
        console.error("Failed to post review");
      } else {
        const updatedReview = [{ rating, comment }, ...fetchReviews];
        setFetchReviews(updatedReview);
        setComment("");
        setRating(0);
        fetchReview();
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/reviews/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setFetchReviews(fetchReviews.filter((review) => review._id !== id));
        toast.success("Review deleted successfully!!");
        console.log(data);
      }
    } catch (error) {
      toast.error("Review deleted successfully!!");
      console.log(error);
    }
  };

  const handleStarClick = (starCount) => {
    setRating(starCount);
  };

  return (
    <>
      <Toaster />
      <div className="mt-20">
        <form
          onSubmit={handlePostReview}
          className="w-full rounded-lg p-2 mx-auto mt-20 mb-10"
        >
          <div className="px-3 mb-20 mt-2">
            <h1 className="font-bold py-2 ">Rate this room</h1>
            <div className="flex justify-start gap-6 text-4xl">
              {[1, 2, 3, 4, 5].map((starCount, index) => (
                <span
                  key={index}
                  className={`cursor-pointer ${rating >= starCount ? "text-yellow-500" : ""
                    }`}
                  onClick={() => handleStarClick(starCount)}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </div>
          <div className="px-3 mb-2 mt-2">
            <h1 className="font-bold py-2 ">Review this room</h1>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="comment"
              required
              className="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium focus:outline-none"
            ></textarea>
          </div>
          <div className="flex justify-start px-4">
            <input
              type="submit"
              className="px-2.5 py-1.5 rounded cursor-pointer text-white text-sm bg-red-600"
              value="Submit"
            />
          </div>
        </form>
        {fetchReviews &&
          fetchReviews.map((review) => (
            <div className="list-reviews flex flex-col px-3" key={review._id}>
              <div className="flex items-center gap-2">
                <h1 className="font-bold">{review?.user?.username}</h1>|
                <span>{review.rating} &#9733;</span>
                <button
                  className="bg-zinc-600 text-white textx-sm rounded-full px-2 py-1 my-4"
                  onClick={() => handleDeleteReview(review._id)}
                >
                  Delete
                </button>
              </div>
              <p>{review.comment}</p>
              <br className="visible-br text-black" />
            </div>
          ))}
      </div>
    </>
  );
};

export default Review;
