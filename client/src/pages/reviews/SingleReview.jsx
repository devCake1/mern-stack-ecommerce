import blankProfilePicture from "../../assets/blank-profile-picture-973460_1280.png";
import "./SingleReview.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const SingleReview = (props) => {
  const [ratingStars, setRatingStars] = useState([]);

  useEffect(() => {
    displayRating(props.review.rating);
  }, []);

  const displayRating = (rating) => {
    const ratingArr = [];
    for (let i = 0; i < rating; i++) {
      ratingArr.push(i);
    }
    setRatingStars(ratingArr);
  };
  
  return (
    <div className="flex my-4 shadow-lg shadow-gray-500/50 p-2 rounded-lg">
      <div className="SingleReview-profile-picture-div flex-none">
        {props.review.imgPath && <img src={import.meta.env.VITE_SERVER_BASE_URL + "/" + props.review.imgPath} alt=""/>}
        {!props.review.imgPath && <img src={blankProfilePicture} alt=""/>}
      </div>
      <div className="flex-1 p-2">
        <h6 className="text-lg font-bold">{props.review.firstName} {props.review.lastName}</h6>
        <div>
          {ratingStars.map((ratingStar) => {
            return (
              <span key={ratingStar}>
                <FontAwesomeIcon icon={faStar} className="text-yellow-600"/>
              </span>
            );
          })}
        </div>
        <p className="mt-2">{props.review.comment}</p>
      </div>
    </div>
  );
};

export default SingleReview;
