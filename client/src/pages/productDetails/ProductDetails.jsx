import defaultImage from "../../assets/image-2935360_1280.png"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux"
import axios from "axios";
import { addToCart } from "../../features/cartSlice";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [discountPrice, setDiscountPrice] = useState(0);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const productId = new URLSearchParams(location.search).get("productId");
    axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/products/${productId}`)
    .then((res) => {
      setProduct(res.data.product);
      if (res.data.product.discount > 0)  {
        calculateDiscountPrice(res.data.product.price, res.data.product.discount);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  const calculateDiscountPrice = (price, discount) => {
    const discountAmount = (discount * price) / 100;
    setDiscountPrice(price - discountAmount);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 mx-4 my-2">
      <div className="p-2">
        {product.imgPath && <img src={import.meta.env.VITE_SERVER_BASE_URL + "/" + product.imgPath} alt=""/>}
        {!product.imgPath && <img src={defaultImage} alt=""/>}
      </div>
      <div className="p-2">
        <h3 className="font-bold text-3xl mb-2">{product.productName}</h3>
        <p className="mb-2">{product.description}</p>
        <h5 className="font-bold text-xl">Price: {(discountPrice > 0)? <span><strike>${product.price}</strike> <span>${discountPrice}</span></span> : <span>${product.price}</span>}</h5>
        <h5 className="font-bold text-xl mb-2">In-stock: {product.inStock}</h5>
        <button className="w-full cursor-pointer bg-blue-300 py-1" onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
