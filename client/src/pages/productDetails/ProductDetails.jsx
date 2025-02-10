import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ProductDetails = () => {
  const location = useLocation();

  useEffect(() => {
    const productId = new URLSearchParams(location.search).get("productId");
    console.log(productId);
  }, []);

  return (
    <div>
      Product details
    </div>
  );
};

export default ProductDetails;
