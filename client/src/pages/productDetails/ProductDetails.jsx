import defaultImage from "../../assets/image-2935360_1280.png"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const location = useLocation();

  useEffect(() => {
    const productId = new URLSearchParams(location.search).get("productId");
    axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/products/${productId}`)
    .then((res) => {
      setProduct(res.data.product);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 mx-4 my-2">
      <div className="p-2">
        {!product.imgPath && <img src={defaultImage} alt="" />}
      </div>
      <div className="p-2">
        <h3 className="font-bold text-3xl mb-2">{product.productName}</h3>
        <p className="mb-2">{product.description}</p>
        <h5 className="font-bold text-xl">Price: ${product.price}</h5>
        <h5 className="font-bold text-xl mb-2">In-stock: {product.inStock}</h5>
        <button className="w-full cursor-pointer bg-blue-300 py-1">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
