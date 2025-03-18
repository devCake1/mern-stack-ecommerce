import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import SingleReview from "./SingleReview";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    getReviews(1);
  }, []);

  const getReviews = (pageNumber) => {
    if (pageNumber < 1) {
      return;
    } else if (totalPages && pageNumber > totalPages) {
      return;
    }
    axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/reviews?page=${pageNumber}`)
    .then((res) => {
      setReviews(res.data.reviews);
      setPage(pageNumber);
      setTotalPages(res.data.totalPages);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {/* review form */}
      <form className="block px-8 my-8" onSubmit={handleSubmit}>
        <h5 className="text-xl font-bold mb-2">Share Your Experience with Us</h5>
        <div className="mb-2">
          <span className="text-lg font-bold">Overall Rating (<FontAwesomeIcon icon={faStar} className="text-yellow-600"/>):&nbsp;</span>
          <select className="border border-black">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="mb-4">
          <h6 className="text-lg font-bold">Your Comment:</h6>
          <textarea className="block w-full border border-black p-2" rows={4} required></textarea>
        </div>
        <div className="mt-2">
          <button type="submit" className="px-4 py-2 bg-blue-300 cursor-pointer">Submit</button>
        </div>
      </form>

      {/* customer reviews heading */}
      <h3 className="text-3xl font-bold border-b-2 border-black mx-8 pb-2">Customer Reviews</h3>

      {/* customer reviews */}
      <div className="px-8">
        {reviews.map((review) => <SingleReview key={review._id} review={review}/>)}
      </div>

      {/* pagination */}
      {totalPages && <div className="text-center my-4">
        <span className="cursor-pointer" onClick={() => getReviews(page - 1)}>&lt;</span>&nbsp;
        <span>{page} /</span>&nbsp;
        <span>{totalPages}</span>&nbsp;
        <span className="cursor-pointer" onClick={() => getReviews(page + 1)}>&gt;</span>
      </div>}
    </div>
  );
};

export default Reviews;
