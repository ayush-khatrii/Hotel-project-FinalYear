import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast, Toaster } from "react-hot-toast";

const UserReview = () => {
  const [reviews, setReviews] = useState([]);
  const { token, user } = useAuth();

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await fetch("http://localhost:3000/reviews", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const reviewsData = await response.json();
        setReviews(reviewsData);
      } catch (error) {
        console.error(error.message);
      }
    };

    getReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    try {
      const resp = await fetch(`http://localhost:3000/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setReviews(reviews.filter((review) => review._id !== reviewId));
      toast.success("Review Deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster />
      <h1 className="font-bold text-center text-xl py-10">User Reviews</h1>
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <table className="w-full table-auto mb-10 min-w-full divide-y  divide-gray-600 border">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                  Comment
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                  Room Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reviews.map((review) => (
                <tr key={review._id}>
                  <td className=" border px-6 py-4">{review.rating + "/5"}</td>
                  <td className="px-6 py-4 border">{review.comment}</td>
                  <td className="px-6 py-4 border">{review?.user?.username}</td>
                  <td className="px-6 py-4 border">{review.room?.roomType}</td>
                  <td className="px-6 py-4 border">{review.room?._id}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(review._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {reviews.length < 1 && (
        <p className="text-center text-xl p-6">No reviews to show!</p>
      )}
    </>
  );
};

export default UserReview;
