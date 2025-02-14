import "./MyProfile.css";
import blankProfilePicture from "../../../assets/blank-profile-picture-973460_1280.png";
import { useState } from "react";

const MyProfile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName"));
  const [lastName, setLastName] = useState(localStorage.getItem("lastName"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [isEdit, setIsEdit] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
  };

  return (
    <div className="MyProfile">
      <h3 className="text-3xl font-bold pb-2 mb-8 border-b border-b-2 border-black">My Profile</h3>
      <div className="mx-auto">
        <form className="block w-full mb-4" onSubmit={handleSave}>
          <div className="MyProfile-picture-div mx-auto">
            {!localStorage.getItem("imgURL") && <img src={blankProfilePicture} alt="" className="w-full h-full rounded-full"/>}
            {isEdit && <input className="block mx-auto mt-2 border border-black cursor-pointer px-1" type="file" value={profilePicture} onChange={(e) => setProfilePicture(e.target.files[0])}/>}
          </div>
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
    </div>
  );
};

export default MyProfile;
