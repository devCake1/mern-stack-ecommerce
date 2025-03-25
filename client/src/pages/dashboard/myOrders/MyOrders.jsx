import "./MyOrders.css";
import defautlImage from "../../../assets/image-2935360_1280.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const MyOrders = () => {
  const userId = localStorage.getItem("userId");
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [shippingStatus, setShippingStatus] = useState("pending");
  const [sessionExpired, setSessionExpired] = useState(false);
  const [viewOrder, setViewOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getMyOrders(userId, "pending", 1);
  }, []);

  const getMyOrders = (userId, shipping, pageNumber) => {
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
    axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/orders/${userId}/${shipping}/${pageNumber}`, {
      headers: {
        signintoken: localStorage.getItem("signInToken")
      }
    })
    .then((res) => {
      setOrders(res.data.result);
      setPage(pageNumber);
      setTotalPages(res.data.totalPages);
    })
    .catch((err) => {
      if (err.response.data.message === "jwt expired") {
        setSessionExpired(true);
      } else {
        console.log(err);
      }
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const getMyOrdersByShippingStatus = (e) => {
    setShippingStatus(e.target.value);
    getMyOrders(userId, e.target.value, page);
  };

  const handleSessionExpired = () => {
    localStorage.clear();
    navigate("/sign-in");
  };

  return (
    <div className="h-full">
      {localStorage.getItem("isAdmin") === "true" && <Navigate to="/dashboard"/>}
      {localStorage.getItem("isAdmin") === "false" && <div className="h-full">
        {/* heading div */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-center border-b-2 border-black pb-1">
            <h3 className="text-3xl font-bold mt-1">My Orders</h3>
            <form className="mt-4 sm:mt-1">
              <span>Shipping status: </span>
              <select className="border border-black" onChange={getMyOrdersByShippingStatus}>
                <option value="pending">Pending</option>
                <option value="complete">Complete</option>
              </select>
            </form>
          </div>
        </div>

        {/* my orders */}
        <div className="MyOrders-orders mt-8 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="bg-black text-white border border-black p-2">Order Id</th>
                <th className="bg-black text-white border border-black p-2">Total</th>
                <th className="bg-black text-white border border-black p-2">Payment</th>
                <th className="bg-black text-white border border-black p-2">Shipping</th>
                <th className="bg-black text-white border border-black p-2">View Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order._id}>
                    <td className="border border-black p-2 text-center">{order._id}</td>
                    <td className="border border-black p-2 text-center">${order.total}</td>
                    <td className="border border-black p-2 text-center">
                      {order.payment && <span>Paid</span>}
                    </td>
                    <td className="border border-black p-2 text-center">
                      {!order.shippingStatus && <span>Pending</span>}
                      {order.shippingStatus && <span>Complete</span>}
                    </td>
                    <td className="border border-black p-2 text-center">
                      <button className="px-4 py-2 bg-blue-300 cursor-pointer" onClick={() => setViewOrder(order)}>View</button>
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
          <span className="cursor-pointer" onClick={() => getMyOrders(userId, shippingStatus, page - 1)}>&lt;</span>&nbsp;
          <span>{page}</span>&nbsp;
          <span>/</span>&nbsp;
          <span>{totalPages}</span>&nbsp;
          <span className="cursor-pointer" onClick={() => getMyOrders(userId, shippingStatus, page + 1)}>&gt;</span>
        </div>}

        {/* session expired modal div */}
        {sessionExpired && <div className="Session-expired-modal-div">
          <div className="Session-expired-modal bg-white p-4 text-center">
            <h3 className="text-3xl font-bold mb-4 text-blue-400">Session Expired</h3>
            <p className="mb-6">Sorry, your session has expired. Please sign-in again</p>
            <button className="px-4 py-2 bg-blue-300 cursor-pointer" onClick={handleSessionExpired}>Ok</button>
          </div>
        </div>}

        {/* view details modal div */}
        {viewOrder && <div className="MyOrders-view-details-modal-div">
          <div className="MyOrders-view-details-modal bg-white overflow-y-auto">
            <div className="bg-blue-200">
              <div className="flex justify-between">
                <h6 className="text-lg font-bold w-full text-center py-1">Order Detail</h6>
                <button className="bg-red-600 text-white text-lg font-bold px-2 py-1 cursor-pointer" onClick={() => setViewOrder(null)}>
                  <FontAwesomeIcon icon={faXmark}/>
                </button>
              </div>
            </div>
            <ViewDetails order={viewOrder}/>
          </div>
        </div>}
      </div>}
    </div>
  );
};

const ViewDetails = (props) => {
  return (
    <div className="px-8 py-4">
      <div className="mb-4 overflow-x-auto">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="py-1 px-4 bg-blue-200 text-right">Order Id</td>
              <td className="py-1 px-4 bg-gray-300">{props.order._id}</td>
            </tr>
            <tr>
              <td className="py-1 px-4 bg-blue-200 text-right">Payment</td>
              {props.order.payment && <td className="py-1 px-4 bg-gray-300">Paid</td>}
            </tr>
            <tr>
              <td className="py-1 px-4 bg-blue-200 text-right">Shipping</td>
              {props.order.shippingStatus && <td className="py-1 px-4 bg-gray-300">Complete</td>}
              {!props.order.shippingStatus && <td className="py-1 px-4 bg-gray-300">Pending</td>}
            </tr>
          </tbody>
        </table>
      </div>
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
                    {item.imgPath && <img src={import.meta.env.VITE_SERVER_BASE_URL + "/" + item.imgPath} alt=""/>}
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

export default MyOrders;
