import "./MyProfile.css";
import blankProfilePicture from "../../../assets/blank-profile-picture-973460_1280.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyProfile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePath, setProfilePicturePath] = useState(localStorage.getItem("imgPath"));
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName"));
  const [lastName, setLastName] = useState(localStorage.getItem("lastName"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [isEdit, setIsEdit] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const navigate = useNavigate();

  const uploadProfilePicture = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePicture", profilePicture);
    formData.append("userId", localStorage.getItem("userId"));
    axios.put(`${import.meta.env.VITE_SERVER_BASE_URL}/api/users/change-profile-picture`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        signintoken: localStorage.getItem("signInToken")
      }
    })
    .then((res) => {
      localStorage.removeItem("imgPath");
      localStorage.setItem("imgPath", res.data.imgPath);
      setProfilePicturePath(res.data.imgPath);
    })
    .catch((err) => {
      if (err.response.data.message === "jwt expired") {
        setSessionExpired(true);
      } else {
        console.log(err);
      }
    })
  };

  const handleSave = (e) => {
    e.preventDefault();
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
  };

  const handleSessionExpired = () => {
    localStorage.clear();
    navigate("/sign-in");
  };

  return (
    <div>
      <h3 className="text-3xl font-bold pb-2 mb-8 border-b border-b-2 border-black">My Profile</h3>
      <div className="MyProfile-info mx-auto">
        <form className="block w-full mb-4" onSubmit={uploadProfilePicture} encType="multipart/form-data">
          <div className="MyProfile-picture-div bg-gray-200 rounded-full mx-auto">
            {!profilePicturePath && <img src={blankProfilePicture} alt="" className="w-full h-full rounded-full"/>}
            {profilePicturePath && <img src={import.meta.env.VITE_SERVER_BASE_URL + "/" + profilePicturePath} alt="" className="w-full h-full rounded-full"/>}
            <input className="block mx-auto mt-2 border border-black cursor-pointer px-1" type="file" accept="image/*" onChange={(e) => setProfilePicture(e.target.files[0])} required/>
          </div>
          <div className="text-center mt-10">
            <button className="bg-blue-300 px-4 py-2 cursor-pointer" type="submit">Upload</button>
          </div>
        </form>
        <form className="block w-full mb-4" onSubmit={handleSave}>
          <h5 className="text-xl font-bold mt-10">First Name</h5>
          {!isEdit && <p className="bg-gray-200 p-1">{firstName}</p>}
          {isEdit && <input className="block w-full border border-black p-1" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>}
          <h5 className="text-xl font-bold mt-2">Last Name</h5>
          {!isEdit && <p className="bg-gray-200 p-1">{lastName}</p>}
          {isEdit && <input className="block w-full border border-black p-1" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>}
          <h5 className="text-xl font-bold mt-2">Email</h5>
          {!isEdit && <p className="bg-gray-200 p-1">{email}</p>}
          {isEdit && <input className="block w-full border border-black p-1" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>}
          <div className="mt-4">
            {!isEdit && <button className="bg-blue-300 px-4 py-2 cursor-pointer" onClick={() => setIsEdit(true)}>Edit</button>}
            {isEdit && <button className="bg-blue-300 px-4 py-2 cursor-pointer me-2" type="submit">Save</button>}
            {isEdit && <button className="bg-red-300 px-4 py-2 cursor-pointer" onClick={() => setIsEdit(false)}>Cancel</button>}
          </div>
        </form>
        <form onSubmit={handleChangePassword}>
          <h5 className="text-xl font-bold mb-2">Change Password</h5>
          <input className="block w-full border border-black p-1 mb-2" type="password" placeholder="Current password" required/>
          <input className="block w-full border border-black p-1 mb-2" type="password" placeholder="New password" required/>
          <input className="block w-full border border-black p-1 mb-2" type="password" placeholder="Confirm new password" required/>
          <div>
            <button className="bg-blue-300 px-4 py-2 cursor-pointer" type="submit">Change</button>
          </div>
        </form>
      </div>
      {sessionExpired && <div className="Session-expired-modal-div">
        <div className="Session-expired-modal bg-white p-4 text-center">
          <h3 className="text-3xl font-bold mb-4 text-blue-400">Session Expired</h3>
          <p className="mb-6">Sorry, your session has expired. Please sign-in again</p>
          <button className="px-4 py-2 bg-blue-300 cursor-pointer" onClick={handleSessionExpired}>Ok</button>
        </div>
      </div>}
    </div>
  );
};

export default MyProfile;
