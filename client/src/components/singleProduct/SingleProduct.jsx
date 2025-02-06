import "./SingleProduct.css";
import defaultImage from "../../assets/image-2935360_1280.png";

const SingleProduct = (props) => {
  return (
    <div className="SingleProduct">
      <div className="SingleProduct-image-div">
        {props.product.imgURL === "" && <img src={defaultImage} alt="" className="block w-full h-full"/>}
      </div>
      <h3 className="SingleProduct-product-name font-bold">{props.product.productName}</h3>
      <p className="SingleProduct-description">{props.product.description}</p>
      <h3 className="margin-top-ten-px font-bold">Price: ${props.product.price}</h3>
      <h3 className="margin-bottom-ten-px font-bold">In-stock: {props.product.inStock}</h3>
      <button className="SingleProduct-button block w-full cursor-pointer bg-blue-300">Add to Cart</button>
      <button className="SingleProduct-button block w-full cursor-pointer bg-green-300">View Details</button>
    </div>
  );
};

export default SingleProduct;
