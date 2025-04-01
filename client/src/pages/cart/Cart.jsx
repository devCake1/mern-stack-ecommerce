import "./Cart.css";
import defaultImage from "../../assets/image-2935360_1280.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, clearCart } from "../../features/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const total = useSelector((state) => state.total);
  const dispatch = useDispatch();
  const [showError, setShowError] = useState("");
  const [sessionExpired, setSessionExpired] = useState(false);
  const [orderSuccessful, setOrderSuccessful] = useState("");
  const navigate = useNavigate();

  const handleBuyNow = () => {
    if (!localStorage.getItem("userId")) {
      setShowError("Please sign-in");
      return;
    }
    setShowError("");
    const newOrder = {
      userId: localStorage.getItem("userId"),
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName"),
      email: localStorage.getItem("email"),
      cart: cart,
      total: total,
      payment: true
    };
    axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/api/orders`, newOrder, {
      headers: {
        signintoken: localStorage.getItem("signInToken")
      }
    })
    .then((res) => {
      setOrderSuccessful(res.data.message);
      dispatch(clearCart());
    })
    .catch((err) => {
      if (err.response.data.message === "jwt expired") {
        setSessionExpired(true);
      } else {
        console.log(err);
      }
    });
  };

  const handleSessionExpired = () => {
    localStorage.clear();
    navigate("/sign-in");
  };

  return (
    <div>
      {(cart.length === 0 && !orderSuccessful) && <div className="text-center pt-8">
        <h3 className="text-3xl font-bold pb-2">Shopping cart is empty</h3>
        <button className="bg-blue-300 cursor-pointer px-4 py-2" onClick={() => navigate("/shop")}>Shop Now</button>
      </div>}
      {(cart.length > 0 && !orderSuccessful) && <div className="overflow-x-auto pb-4">
        <h3 className="text-3xl font-bold text-center py-4">Shopping Cart</h3>
        <table className="mx-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-black text-white" colSpan="2">Product</th>
              <th className="px-4 py-2 bg-black text-white">Price</th>
              <th className="px-4 py-2 bg-black text-white">Quantity</th>
              <th className="px-4 py-2 bg-black text-white">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              return (
                <tr key={item._id} className="border-b border-black">
                  <td className="Cart-item-image-td px-4 py-2">
                    {item.imgPath && <img src={import.meta.env.VITE_SERVER_BASE_URL + "/" + item.imgPath} alt=""/>}
                    {!item.imgPath && <img src={defaultImage} alt=""/>}
                  </td>
                  <td className="px-4 py-2 text-xl font-bold text-left">{item.productName}</td>
                  {item.discount === 0 && <td className="px-4 py-2">${item.price}</td>}
                  {item.discount > 0 && <td className="px-4 py-2">${item.price - ((item.discount * item.price) / 100)}</td>}
                  <td className="px-4 py-2 text-center">
                    <div>
                      <button className="Cart-item-quantity-button border border-black cursor-pointer" onClick={() => dispatch(decrement(item._id))}>-</button>
                    </div>
                    <div>
                      {item.quantity}
                    </div>
                    <div>
                      <button className="Cart-item-quantity-button border border-black cursor-pointer" onClick={() => dispatch(increment(item._id))}>+</button>
                    </div>
                  </td>
                  {item.discount === 0 && <td className="px-4 py-2 text-center">${item.price * item.quantity}</td>}
                  {item.discount > 0 && <td className="px-4 py-2 text-center">${(item.price - ((item.discount * item.price) / 100)) * item.quantity}</td>}
                </tr>
              );
            })}
            <tr>
              <td colSpan="5" className="text-right px-4 py-2 font-bold">Total = ${total}</td>
            </tr>
            <tr>
              <td colSpan="5" className="py-2">
                <p className="text-red-600 mb-2">{showError}</p>
                <button className="w-full border border-2 border-black font-bold cursor-pointer py-2" onClick={handleBuyNow}>Buy Now</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>}
      {orderSuccessful && <div className="text-center">
        <h3 className="mt-8 mb-4 text-3xl text-bold text-green-400">{orderSuccessful}</h3>
        <button className="px-4 py-2 bg-blue-300 cursor-pointer" onClick={() => navigate("/shop")}>Continue Shopping</button>
      </div>}
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

export default Cart;
