import "./Cart.css";
import defaultImage from "../../assets/image-2935360_1280.png";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../../features/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const total = useSelector((state) => state.total);
  const dispatch = useDispatch();

  return (
    <div>
      {cart.length === 0 && <div className="text-center pt-8">
        <h3 className="text-3xl font-bold pb-2">Shopping cart is empty</h3>
        <button className="bg-blue-300 cursor-pointer px-4 py-2">Shop Now</button>
      </div>}
      {cart.length > 0 && <div className="overflow-x-auto pb-4">
        <h3 className="text-3xl font-bold text-center py-4">Shopping Cart</h3>
        <table className="mx-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-black text-white">Product Image</th>
              <th className="px-4 py-2 bg-black text-white text-left">Product Name</th>
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
                    {!item.imgURL && <img src={defaultImage} alt=""/>}
                  </td>
                  <td className="px-4 py-2 text-xl font-bold text-left">{item.productName}</td>
                  <td className="px-4 py-2">${item.price}</td>
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
                  <td className="px-4 py-2 text-center">${item.price * item.quantity}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan="5" className="text-right px-4 py-2">Total = ${total}</td>
            </tr>
            <tr>
              <td colSpan="5" className="py-2">
                <button className="w-full border border-2 border-black font-bold cursor-pointer py-2">Buy Now</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>}
    </div>
  );
};

export default Cart;
