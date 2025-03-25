import "./Users.css";
import blankProfilePicture from "../../../assets/blank-profile-picture-973460_1280.png";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [defaultRole, setDefaultRole] = useState("User");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState("");
  // first name of the user whose account has been selected to delete
  const [delFirstName, setDelFirstName] = useState("");
  // last name of the user whose account has been selected to delete
  const [delLastName, setDelLastName] = useState("");
  // email of the user whose account has been selected to delete
  const [delEmail, setDelEmail] = useState("");
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [sessionExpired, setSessionExpired] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers(1, 10, "User");
  }, []);

  const getUsers = (pageNumber, limit, role) => {
    if (pageNumber < 1) {
      return;
    } else if (totalPages && pageNumber > totalPages) {
      return;
    }
    setUsers([]);
    setShowMessage("");
    setEmail("");
    window.scrollTo(0, 0);
    axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/users?page=${pageNumber}&limit=${limit}&role=${role}`, {
      headers: {
        signintoken: localStorage.getItem("signInToken"),
        userid: localStorage.getItem("userId")
      }
    })
    .then((res) => {
      setUsers(res.data.users);
      setPage(pageNumber);
      setTotalPages(res.data.totalPages);
    })
    .catch((err) => {
      if (err.response.data.message === "jwt expired") {
        setSessionExpired(true);
      } else {
        console.log(err);
      }
    });
  };

  const getUsersByRole = (e) => {
    setDefaultRole(e.target.value);
    getUsers(page, rowsPerPage, e.target.value);
  };

  const changeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    getUsers(page, e.target.value, defaultRole);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setShowMessage("");
    axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/users/${email}`, {
      headers: {
        signintoken: localStorage.getItem("signInToken"),
        userid: localStorage.getItem("userId")
      }
    })
    .then((res) => {
      setTotalPages(null);
      if (res.data.isSuccessful) {
        setUsers([res.data.user]);
        if (res.data.user.isAdmin) {
          setDefaultRole("Admin");
        } else {
          setDefaultRole("User");
        }
      } else {
        setUsers([]);
        setShowMessage(res.data.message);
      }
    })
    .catch((err) => {
      if (err.response.data.message === "jwt expired") {
        setSessionExpired(true);
      } else {
        console.log(err);
      }
    });
  };

  const showConfirmDeleteModal = (firstName, lastName, email) => {
    setDelFirstName(firstName);
    setDelLastName(lastName);
    setDelEmail(email);
    setConfirmDeleteModal(true);
  };

  const deleteUserAccount = () => {
    axios.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/api/users/${delEmail}`, {
      headers: {
        signintoken: localStorage.getItem("signInToken"),
        userid: localStorage.getItem("userId")
      }
    })
    .then((res) => {
      setDeleteMessage(res.data.message);
    })
    .catch((err) => {
      if (err.response.data.message === "jwt expired") {
        setSessionExpired(true);
      } else {
        console.log(err);
      }
    })
  };

  const handleSessionExpired = () => {
    localStorage.clear();
    navigate("/sign-in");
  };

  return (
    <div>
      {localStorage.getItem("isAdmin") === "false" && <Navigate to="/dashboard/my-profile"/>}
      {localStorage.getItem("isAdmin") === "true" && <div>
        {/* users heading and select role */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-center border-b-2 border-black pb-1">
            <h3 className="text-3xl font-bold mt-1">Users</h3>
            <form className="mt-4 sm:mt-1">
              <span>Select role: </span>
              <select className="border border-black" value={defaultRole} onChange={getUsersByRole}>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </form>
          </div>
        </div>

        {/* form to search user by email and rowsPerPage form */}
        <div className="mb-4">
          <div className="flex flex-col lg:flex-row justify-between">
            <form className="mt-2" onSubmit={handleSearch}>
              <input className="border border-black p-1" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>&nbsp;
              <button className="px-4 py-1 cursor-pointer bg-blue-300 border border-blue-300" type="submit">Search</button>
            </form>
            <form className="mt-2">
              <span>Rows per page: </span>
              <select className="border border-black p-1" value={rowsPerPage} onChange={changeRowsPerPage}>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </form>
          </div>
        </div>

        {/* users */}
        <div className="Users-div overflow-x-auto mt-4">
          <table className="w-full">
            <thead>
              <tr>
                <th className="bg-black text-white p-1">Profile Picture</th>
                <th className="bg-black text-white p-1">Name</th>
                <th className="bg-black text-white p-1">Email</th>
                <th className="bg-black text-white p-1">Role</th>
                <th className="bg-black text-white p-1">Change Role</th>
                <th className="bg-black text-white p-1"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => <tr key={user._id}>
                <td className="Users-profile-picture-td border border-black p-1">
                  {user.imgPath && <img src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user.imgPath}`}/>}
                  {!user.imgPath && <img src={blankProfilePicture} alt=""/>}
                </td>
                <td className="border border-black p-1 text-center">{user.firstName} {user.lastName}</td>
                <td className="border border-black p-1 text-center">{user.email}</td>
                <td className="border border-black p-1 text-center">
                  {!user.isAdmin && <span>User</span>}
                  {user.isAdmin && <span>Admin</span>}
                </td>
                <td className="border border-black p-1 text-center">
                  {!user.isAdmin && <button className="px-4 py-2 cursor-pointer bg-blue-300">Change Role to Admin</button>}
                  {user.isAdmin && <button className="px-4 py-2 cursor-pointer bg-blue-300">Change Role to User</button>}
                </td>
                <td className="border border-black p-1 text-center">
                  <button className="cursor-pointer text-red-600" onClick={() => showConfirmDeleteModal(user.firstName, user.lastName, user.email)}>
                    <FontAwesomeIcon icon={faTrashCan}/>
                  </button>
                </td>
              </tr>)}
            </tbody>
          </table>
        </div>

        {/* pagination */}
        {totalPages && <div className="text-center mt-2">
          <span className="cursor-pointer" onClick={() => getUsers(page - 1, rowsPerPage, defaultRole)}>&lt;</span>&nbsp;
          <span>{page} /</span>&nbsp;
          <span>{totalPages}</span>&nbsp;
          <span className="cursor-pointer" onClick={() => getUsers(page + 1, rowsPerPage, defaultRole)}>&gt;</span>
        </div>}

        {/* show message */}
        {showMessage && <h5 className="text-xl font-bold text-center text-gray-600">{showMessage}</h5>}

        {/* confirm delete modal div */}
        {confirmDeleteModal && <div className="Users-confirm-delete-modal-div">
          <div className="Users-confirm-delete-modal bg-white">
            {!deleteMessage && <div className="mb-2">
              <div className="flex justify-between bg-red-600 text-white">
                <h6 className="text-lg font-bold ps-2">Confirm Delete</h6>
                <button className="px-2">
                  <FontAwesomeIcon icon={faXmark} className="cursor-pointer" onClick={() => setConfirmDeleteModal(false)}/>
                </button>
              </div>
            </div>}
            {deleteMessage && <div className="mb-2">
              <div className="flex justify-between bg-blue-200">
                <h6 className="text-lg font-bold ps-2">Delete Message</h6>
                <button className="px-2">
                  <FontAwesomeIcon icon={faXmark} className="cursor-pointer" onClick={() => {
                    setConfirmDeleteModal(false);
                    setDeleteMessage("");
                    getUsers(page, rowsPerPage, defaultRole);
                  }}/>
                </button>
              </div>
            </div>}
            {!deleteMessage && <p className="px-4 text-center mb-2">Do you want to delete this user account (Name: {delFirstName} {delLastName}, Email: {delEmail})?</p>}
            {!deleteMessage && <div className="text-center pb-4">
              <button className="px-4 py-2 bg-red-600 cursor-pointer text-white" onClick={deleteUserAccount}>Delete</button>&nbsp;
              <button className="px-4 py-2 bg-gray-300 cursor-pointer" onClick={() => setConfirmDeleteModal(false)}>Cancel</button>
            </div>}
            {deleteMessage && <p className="px-4 text-center mb-2">{deleteMessage}</p>}
            {deleteMessage && <div className="text-center pb-4">
              <button className="px-4 py-2 bg-blue-300 cursor-pointer" onClick={() => {
                setConfirmDeleteModal(false);
                setDeleteMessage("");
                getUsers(page, rowsPerPage, defaultRole);
              }}>Ok</button>
            </div>}
          </div>
        </div>}

        {/* session expired modal div */}
        {sessionExpired && <div className="Session-expired-modal-div">
          <div className="Session-expired-modal bg-white p-4 text-center">
            <h3 className="text-3xl font-bold mb-4 text-blue-400">Session Expired</h3>
            <p className="mb-6">Sorry, your session has expired. Please sign-in again</p>
            <button className="px-4 py-2 bg-blue-300 cursor-pointer" onClick={handleSessionExpired}>Ok</button>
          </div>
        </div>}
      </div>}
    </div>
  )
};

export default Users;
