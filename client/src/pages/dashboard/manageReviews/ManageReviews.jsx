import blankProfilePicture from "../../../assets/blank-profile-picture-973460_1280.png";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    getReviews(1, 10);
  }, []);

  const getReviews = (pageNumber, reviewsPerPage) => {
    if (pageNumber < 1) {
      return;
    } else if (totalPages && pageNumber > totalPages) {
      return;
    }
    setReviews([]);
    axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/reviews?page=${pageNumber}&limit=${reviewsPerPage}`)
    .then((res) => {
      setReviews(res.data.reviews);
      setPage(pageNumber);
      setTotalPages(res.data.totalPages);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const changeItemsPerPage = (e) => {
    setItemsPerPage(e.target.value);
    getReviews(page, e.target.value);
  };

  return (
    <div>
      {localStorage.getItem("isAdmin") === "false" && <Navigate to="/dashboard/my-profile"/>}
      {localStorage.getItem("isAdmin") === "true" && <div>
        {/* reviews heading and select itemsPerPage */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-center border-b-2 border-black pb-1">
            <h3 className="text-3xl font-bold mt-1">Reviews</h3>
            <form className="mt-4 sm:mt-1">
              <span>Items per page: </span>
              <select className="border border-black" value={itemsPerPage} onChange={changeItemsPerPage}>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </form>
          </div>
        </div>

        {/* reviews */}
        <div>
          {reviews.map((review) => <SingleReview key={review._id} review={review} getReviews={getReviews} page={page} itemsPerPage={itemsPerPage}/>)}
        </div>

        {/* pagination */}
        <div className="text-center mt-4">
          <span className="cursor-pointer" onClick={() => getReviews(page - 1, itemsPerPage)}>&lt;</span>&nbsp;
          <span>{page} /</span>&nbsp;
          <span>{totalPages}</span>&nbsp;
          <span className="cursor-pointer" onClick={() => getReviews(page + 1, itemsPerPage)}>&gt;</span>
        </div>
      </div>}
    </div>
  );
};

const SingleReview = (props) => {
  const [ratingStars, setRatingStars] = useState([]);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");

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

  const handleDelete = () => {
    axios.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/api/reviews/${props.review._id}`, {
      headers: {
        signintoken: localStorage.getItem("signInToken"),
        userid: localStorage.getItem("userId")
      }
    })
    .then((res) => {
      setDeleteMessage(res.data.message);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const profilePictureStyle = {
    width: "100px",
    height: "100px"
  };

  const confirmDeleteModalDivStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "1"
  };

  const confirmDeleteModalStyle = {
    position: "relative",
    top: "60px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "300px"
  };

  return (
    <div className="relative">
      <div className="flex my-4 shadow-lg shadow-gray-500/50 p-2 rounded-lg">
        <div className="flex-none">
          {props.review.imgPath && <img src={import.meta.env.VITE_SERVER_BASE_URL + "/" + props.review.imgPath} alt="" style={ profilePictureStyle }/>}
          {!props.review.imgPath && <img src={blankProfilePicture} alt="" style={ profilePictureStyle }/>}
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
      <button className="absolute top-0 right-0 bg-red-600 text-white px-2 py-1 rounded-full cursor-pointer" onClick={() => setConfirmDeleteModal(true)}>
        <FontAwesomeIcon icon={faTrashCan}/>
      </button>

      {/* confirm delete modal div */}
      {confirmDeleteModal && <div style={ confirmDeleteModalDivStyle }>
        <div style={ confirmDeleteModalStyle } className="bg-white">
          {!deleteMessage && <div>
            <div className="flex justify-between bg-red-600 text-white p-2">
              <h6 className="text-lg font-bold">Confirm Delete</h6>
              <button>
                <FontAwesomeIcon icon={faXmark} className="text-lg cursor-pointer" onClick={() => setConfirmDeleteModal(false)}/>
              </button>
            </div>
          </div>}
          {!deleteMessage && <p className="my-2 text-center px-4">Do you want to delete this review?</p>}
          {!deleteMessage && <div className="text-center pb-2">
            <button className="px-4 py-2 bg-red-600 text-white cursor-pointer" onClick={handleDelete}>Delete</button>&nbsp;
            <button className="px-4 py-2 bg-gray-300 cursor-pointer" onClick={() => setConfirmDeleteModal(false)}>Cancel</button>
          </div>}
          {deleteMessage && <div>
            <div className="flex justify-between bg-red-600 text-white p-2">
              <h6 className="text-lg font-bold">Delete Message</h6>
              <button>
                <FontAwesomeIcon icon={faXmark} className="text-lg cursor-pointer" onClick={() => setConfirmDeleteModal(false)}/>
              </button>
            </div>
          </div>}
          {deleteMessage && <p className="my-2 text-center px-4">{deleteMessage}</p>}
          {deleteMessage && <div className="text-center pb-4">
            <button className="px-4 py-2 bg-blue-300 cursor-pointer" onClick={() => {
              setConfirmDeleteModal(false);
              setDeleteMessage("");
              props.getReviews(props.page, props.itemsPerPage);
            }}>Ok</button>
          </div>}
        </div>
      </div>}
    </div>
  );
};

export default ManageReviews;
