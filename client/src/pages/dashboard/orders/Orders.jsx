import "./Orders.css";
import defautlImage from "../../../assets/image-2935360_1280.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons"; 
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [shippingStatus, setShippingStatus] = useState();
  const [totalPages, setTotalPages] = useState(null);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [viewOrder, setViewOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getOrders("pending", 1);
  }, []);

  const getOrders = (shipping, pageNumber) => {
    if (pageNumber < 1) {
      return;
    } else if (totalPages && pageNumber > totalPages) {
      return;
    }
    if (shipping === "pending") {
      shipping = false;
    } else {
      shipping = true;
    }
    setIsLoading(true);
    axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/orders/${shipping}/${pageNumber}`, {
      headers: {
        signintoken: localStorage.getItem("signInToken"),
        userid: localStorage.getItem("userId")
      }
    })
    .then((res) => {
      setOrders(res.data.orders);
      setPage(pageNumber);
      setTotalPages(res.data.totalPages);
    })
    .catch((err) => {
      if (err.response.data.message === "jwt expired") {
        setSessionExpired(true);
      } else {
        console.log(err);
      }
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  const getOrdersByShippingStatus = (e) => {
    setShippingStatus(e.target.value);
    getOrders(e.target.value, page);
  };

  const handleDeliver = (order) => {
    setIsLoading(true);
    axios.put(`${import.meta.env.VITE_SERVER_BASE_URL}/api/orders/deliver-order`, order, {
      headers: {
        signintoken: localStorage.getItem("signInToken"),
        userid: localStorage.getItem("userId")
      }
    })
    .then((res) => {
      if (res.data.isSuccessful) {
        setShowError("");
        getOrders("pendeing", page);
        setSuccessMessage(res.data.message);
      } else {
        setSuccessMessage("");
        setShowError(res.data.message);
      }
    })
    .catch((err) => {
      if (err.response.data.message === "jwt expired") {
        setSessionExpired(true);
      } else {
        console.log(err);
      }
    })
    .finally(() => {
      setIsLoading(false);
    })
  };

  const handleSessionExpired = () => {
    localStorage.clear();
    navigate("/sign-in");
  };

  return (
    <div className="h-full">
      {(localStorage.getItem("isAdmin") === "false") && <Navigate to="/dashboard/my-profile"/>}
      {localStorage.getItem("isAdmin") === "true" && <div className="h-full">
        {/* heading div */}
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row justify-between border-b-2 border-black pb-1">
            <h3 className="text-3xl font-bold mt-1">Orders</h3>
            <form className="mt-4 sm:mt-1">
              <span>Shipping status: </span>
              <select className="border border-black" onChange={getOrdersByShippingStatus}>
                <option value="pending">Pending</option>
                <option value="complete">Complete</option>
              </select>
            </form>
          </div>
        </div>

        {successMessage && <div className="py-1 bg-green-200">
          <div className="flex justify-between">
            <p className="mx-2">{successMessage}</p>
            <button className="mx-2 cursor-pointer" onClick={() => setSuccessMessage("")}>
              <FontAwesomeIcon icon={faCircleXmark}/>
            </button>
          </div>
        </div>}

        {showError && <div className="py-1 bg-red-200">
          <div className="flex justify-between">
            <p className="mx-2">{showError}</p>
            <button className="mx-2 cursor-pointer" onClick={() => setShowError("")}>
              <FontAwesomeIcon icon={faCircleXmark}/>
            </button>
          </div>
        </div>}

        {/* orders */}
        <div className="Orders-div mt-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th  className="bg-black text-white border border-black p-2">Name</th>
                <th  className="bg-black text-white border border-black p-2">Total</th>
                <th  className="bg-black text-white border border-black p-2">Payment</th>
                <th  className="bg-black text-white border border-black p-2">Shipping</th>
                <th  className="bg-black text-white border border-black p-2">View Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order._id}>
                    <td className="border border-black p-2 text-center">{order.firstName} {order.lastName}</td>
                    <td className="border border-black p-2 text-center">${order.total}</td>
                    <td className="border border-black p-2 text-center">
                      {order.payment && <span>Paid</span>}
                    </td>
                    <td className="border border-black p-2 text-center">
                      {!order.shippingStatus && <span>Pending<br/><button className="px-4 py-2 bg-green-300 cursor-pointer mt-2" onClick={() => handleDeliver(order)}>Deliver</button></span>}
                      {order.shippingStatus && <span>Complete</span>}
                    </td>
                    <td className="border border-black p-2 text-center">
                      <button className="px-4 py-1 bg-blue-300 cursor-pointer" onClick={() => setViewOrder(order)}>View</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {(!isLoading && orders.length === 0) && <h5 className="text-xl font-bold text-gray-600 text-center my-2">No result found</h5>}
        </div>

        {/* pagination */}
        {(!isLoading && orders.length > 0) && <div className="text-center py-4">
          <span className="cursor-pointer" onClick={() => getOrders(shippingStatus, page - 1)}>&lt;</span>&nbsp;
          <span>{page}</span>&nbsp;
          <span>/</span>&nbsp;
          <span>{totalPages}</span>&nbsp;
          <span className="cursor-pointer" onClick={() => getOrders(shippingStatus, page + 1)}>&gt;</span>
        </div>}

        {/* session expired modal div */}
        {sessionExpired && <div className="Session-expired-modal-div">
          <div className="Session-expired-modal bg-white p-4 text-center">
            <h3 className="text-3xl font-bold mb-4 text-blue-400">Session Expired</h3>
            <p className="mb-6">Sorry, your session has expired. Please sign-in again</p>
            <button className="px-4 py-2 bg-blue-300 cursor-pointer" onClick={handleSessionExpired}>Ok</button>
          </div>
        </div>}

        {viewOrder && <div className="Orders-view-details-modal-div">
          <div className="Orders-view-details-modal bg-white overflow-y-auto">
            <ViewDetails order={viewOrder}/>
            <button className="absolute top-0 right-0 bg-red-800 text-white px-2 py-1 cursor-pointer" onClick={() => setViewOrder(null)}>
              <FontAwesomeIcon icon={faXmark}/>
            </button>
          </div>
        </div>}
      </div>}
    </div>
  );
};

const ViewDetails = (props) => {
  return (
    <div className="pt-10 pb-2 px-2">
      <h5 className="text-xl font-bold mb-1">Order Id: {props.order._id}</h5>
      <h5 className="text-xl font-bold mb-1">Name: {props.order.firstName} {props.order.lastName}</h5>
      <h5 className="text-xl font-bold mb-1">Email: {props.order.email}</h5>
      {props.order.payment && <h5 className="text-xl font-bold mb-1">Payment: Paid</h5>}
      {!props.order.shippingStatus && <h5 className="text-xl font-bold mb-4">Shipping: Pending</h5>}
      {props.order.shippingStatus && <h5 className="text-xl font-bold mb-4">Shipping: Complete</h5>}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="bg-black text-white p-2 border border-black" colSpan="2">Product</th>
              <th className="bg-black text-white p-2 border border-black">Price</th>
              <th className="bg-black text-white p-2 border border-black">Quantity</th>
              <th className="bg-black text-white p-2 border border-black">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {props.order.cart.map((item) => {
              return (
                <tr key={item._id} className="border-b border-black">
                  <td className="MyOrders-item-image-td p-2">
                    {!item.imgPath && <img src={defautlImage} alt=""/>}
                  </td>
                  <td className="p-2">{item.productName}</td>
                  <td className="p-2">${item.price}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">${item.price * item.quantity}</td>
                </tr>
              );
            })}
            <tr className="border-b border-black">
              <td className="p-2 text-end font-bold" colSpan="5">Total = ${props.order.total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
