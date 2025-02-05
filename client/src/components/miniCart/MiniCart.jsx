import "./MiniCart.css";

const MiniCart = () => {
  return (
    <div className="MiniCart bg-white shadow-xl shadow-gray-600/50">
      <div className="MiniCart-empty">
        <h3 className="text-center">Shopping cart is empty</h3>
        <button className="bg-blue-300 cursor-pointer">Shop Now</button>
      </div>
    </div>
  );
};

export default MiniCart;
