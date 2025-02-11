import "./MiniCart.css";
import defaultImage from "../../assets/image-2935360_1280.png";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../../features/cartSlice";

const MiniCart = () => {
  const cart = useSelector((state) => state.cart);
  const total = useSelector((state) => state.total);
  const dispatch = useDispatch();

  return (
    <div className="MiniCart relative bg-white shadow-xl shadow-gray-600/50 p-2">
      {cart.length === 0 && <div className="MiniCart-empty">
        <h3 className="text-center">Shopping cart is empty</h3>
        <button className="bg-blue-300 cursor-pointer">Shop Now</button>
      </div>}
      <div className="MiniCart-items-div overflow-y-auto">
        {cart.map((item) => {
          return (
            <div key={item._id} className="grid grid-cols-3 gap-2 mb-2">
              <div className="MiniCart-item-image">
                {!item.imgURL && <img src={defaultImage} alt="" className="w-full h-full"/>}
              </div>
              <div className="col-span-2">
                <h5 className="text-xl font-bold mb-1">{item.productName}</h5>
                <p className="font-bold mb-3">${item.price * item.quantity}</p>
                <div>
                  <button className="border border-black px-2 cursor-pointer" onClick={() => dispatch(decrement(item._id))}>-</button>&nbsp;
                  <span>{item.quantity}</span>&nbsp;
                  <button className="border border-black px-2 cursor-pointer"  onClick={() => dispatch(increment(item._id))}>+</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* mini-cart total and "view full-car" button */}
      <div className="absolute w-full bottom-0 left-0">
        <h5 className="text-xl font-bold text-right pe-2">Total: ${total}</h5>
        <div className="p-2">
          <button className="w-full border border-2 border-black font-bold cursor-pointer py-2">View Full-Cart</button>
        </div>
        <div className="p-2">
          <button className="w-full border border-2 border-black font-bold cursor-pointer py-2">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default MiniCart;
