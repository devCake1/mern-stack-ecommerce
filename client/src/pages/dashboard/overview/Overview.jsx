import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Overview = () => {
  const [totalPendingOrders, setTotalPendingOrders] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [sessionExpired, setSessionExpired] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/users/admin/get-overview`, {
      headers: {
        signintoken: localStorage.getItem("signInToken"),
        userid: localStorage.getItem("userId")
      }
    })
    .then((res) => {
      setTotalPendingOrders(res.data.totalPendingOrders);
      setTotalCategories(res.data.totalCategories);
      setTotalProducts(res.data.totalProducts);
      setTotalCustomers(res.data.totalCustomers);
    })
    .catch((err) => {
      if (err.response.data.message === "jwt expired") {
        setSessionExpired(true);
      } else {
        console.log(err);
      }
    })
  }, []);

  const handleSessionExpired = () => {
    localStorage.clear();
    navigate("/sign-in");
  };

  return (
    <div>
      {(localStorage.getItem("isAdmin") === "false") && <Navigate to="/dashboard/my-profile"/>}
      {localStorage.getItem("isAdmin") === "true" && <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-orange-600 text-white p-2">
            <h5 className="text-xl font-bold text-center">Total Pending Orders</h5>
            <h2 className="text-4xl text-center">{totalPendingOrders}</h2>
          </div>
          <div className="bg-teal-600 text-white p-2">
            <h5 className="text-xl font-bold text-center">Total Categories</h5>
            <h2 className="text-4xl text-center">{totalCategories}</h2>
          </div>
          <div className="bg-sky-600 text-white p-2">
            <h5 className="text-xl font-bold text-center">Total Products</h5>
            <h2 className="text-4xl text-center">{totalProducts}</h2>
          </div>
          <div className="bg-lime-600 text-white p-2">
            <h5 className="text-xl font-bold text-center">Total Customers</h5>
            <h2 className="text-4xl text-center">{totalCustomers}</h2>
          </div>
        </div>

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
  );
};

export default Overview;
