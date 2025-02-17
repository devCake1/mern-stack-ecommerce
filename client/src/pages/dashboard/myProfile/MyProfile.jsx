import "./MyProfile.css";
import blankProfilePicture from "../../../assets/blank-profile-picture-973460_1280.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const MyProfile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePath, setProfilePicturePath] = useState(localStorage.getItem("imgPath"));
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName"));
  const [lastName, setLastName] = useState(localStorage.getItem("lastName"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [profileUpdateMessage, setProfileUpdateMessage] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [changePasswordMessage, setChangePasswordMessage] = useState("");
  const [changePasswordError, setChangePasswordError] = useState("");
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
    const profileInfo = { firstName, lastName, email, userId: localStorage.getItem("userId") };
    axios.put(`${import.meta.env.VITE_SERVER_BASE_URL}/api/users/update-profile-info`, profileInfo, {
      headers: {
        signintoken: localStorage.getItem("signInToken")
      }
    })
    .then((res) => {
      localStorage.removeItem("firstName");
      localStorage.setItem("firstName", res.data.user.firstName);
      setFirstName(res.data.user.firstName)
      localStorage.removeItem("lastName");
      localStorage.setItem("lastName", res.data.user.lastName);
      setLastName(res.data.user.lastName);
      localStorage.removeItem("email");
      localStorage.setItem("email", res.data.user.email);
      setEmail(res.data.user.email);
      setProfileUpdateMessage(res.data.message);
      setIsEdit(false);
    })
    .catch((err) => {
      if (err.response.data.message === "jwt expired") {
        setSessionExpired(true);
      } else {
        console.log(err);
      }
    })
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword === confirmNewPassword) {
      setChangePasswordError("");
      const changePasswordData = { currentPassword, newPassword, userId: localStorage.getItem("userId") };
      axios.put(`${import.meta.env.VITE_SERVER_BASE_URL}/api/users/change-password`, changePasswordData, {
        headers: {
          signintoken: localStorage.getItem("signInToken")
        }
      })
      .then((res) => {
        if (res.data.isSuccessful) {
          setChangePasswordError("");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
          setChangePasswordMessage(res.data.message);
        } else {
          setChangePasswordMessage("");
          setChangePasswordError(res.data.message);
        }
      })
      .catch((err) => {
        if (err.response.data.message === "jwt expired") {
          setSessionExpired(true);
        } else {
          console.log(err);
        }
      });
    } else {
      setChangePasswordError("New password and confirm new password do not match");
    }
  };

  const handleSessionExpired = () => {
    localStorage.clear();
    navigate("/sign-in");
  };

  return (
    <div>
      <h3 className="text-3xl font-bold pb-2 mb-8 border-b border-b-2 border-black">My Profile</h3>
      <div className="MyProfile-info mx-auto">
        {/* change profile picture */}
        <form className="block w-full mb-4" onSubmit={uploadProfilePicture} encType="multipart/form-data">
          <div className="MyProfile-picture-div bg-gray-200 rounded-full mx-auto">
            {!profilePicturePath && <img src={blankProfilePicture} alt="" className="w-full h-full rounded-full"/>}
            {profilePicturePath && <img src={import.meta.env.VITE_SERVER_BASE_URL + "/" + profilePicturePath} alt="" className="w-full h-full rounded-full"/>}
            <input className="block mx-auto mt-2 border border-black px-1" type="file" accept="image/*" onChange={(e) => setProfilePicture(e.target.files[0])} required/>
          </div>
          <div className="text-center mt-10">
            <button className="bg-blue-300 px-4 py-2 cursor-pointer" type="submit">Upload</button>
          </div>
        </form>

        {/* update profile info */}
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
          {profileUpdateMessage && <div className="close-MyProfile-update-message mt-2 bg-green-200" id="MyProfile-update-message">
            <div className="flex justify-between p-2">
              <p className="pe-2">{profileUpdateMessage}</p>
              <button className="cursor-pointer" onClick={() => setProfileUpdateMessage("")}>
                <FontAwesomeIcon icon={faCircleXmark}/>
              </button>
            </div>
          </div>}
          <div className="mt-4">
            {!isEdit && <button className="bg-blue-300 px-4 py-2 cursor-pointer" onClick={() => setIsEdit(true)}>Edit</button>}
            {isEdit && <button className="bg-blue-300 px-4 py-2 cursor-pointer me-2" type="submit">Save</button>}
            {isEdit && <button className="bg-red-300 px-4 py-2 cursor-pointer" onClick={() => setIsEdit(false)}>Cancel</button>}
          </div>
        </form>

        {/* change password */}
        <form onSubmit={handleChangePassword}>
          <h5 className="text-xl font-bold mt-8 mb-4">Change Password</h5>
          <input className="block w-full border border-black p-1 mb-2" type="password" placeholder="Current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required/>
          <input className="block w-full border border-black p-1 mb-2" type="password" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required/>
          <input className="block w-full border border-black p-1" type="password" placeholder="Confirm new password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required/>
          {changePasswordMessage && <div className="close-MyProfile-update-message mt-2 bg-green-200" id="MyProfile-update-message">
            <div className="flex justify-between p-2">
              <p className="pe-2">{changePasswordMessage}</p>
              <button className="cursor-pointer" onClick={() => setChangePasswordMessage("")}>
                <FontAwesomeIcon icon={faCircleXmark}/>
              </button>
            </div>
          </div>}
          {changePasswordError && <p className="text-red-600 py-1">{changePasswordError}</p>}
          <div className="mt-4">
            <button className="bg-blue-300 px-4 py-2 cursor-pointer" type="submit">Change</button>
          </div>
        </form>
      </div>

      {/* session expired modal div */}
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
