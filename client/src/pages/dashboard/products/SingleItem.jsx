import "./SingleItem.css";
import defaultImage from "../../../assets/image-2935360_1280.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const SingleItem = (props) => {
  const [productImage, setProductImage] = useState(null);
  const [productImagePath, setProductImagePath] = useState(props.product.imgPath);
  const [productName, setProductName] = useState(props.product.productName);
  const [description, setDescription] = useState(props.product.description);
  const [productCategory, setProductCategory] = useState(props.product.category);
  const [discount, setDisCount] = useState(props.product.discount);
  const [price, setPrice] = useState(props.product.price);
  const [inStock, setInStock] = useState(props.product.inStock);
  const [productUpdateMessage, setProductUpdateMessage] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const navigate = useNavigate();

  const uploadProductImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productImage", productImage);
    formData.append("productId", props.product._id);
    axios.put(`${import.meta.env.VITE_SERVER_BASE_URL}/api/products/change-product-image`, formData, {
      headers: {
        signintoken: localStorage.getItem("signInToken"),
        userid: localStorage.getItem("userId")
      }
    })
    .then((res) => {
      setProductImagePath(res.data.imgPath);
    })
    .catch((err) => {
      if (err.response.data.message === "jwt expired") {
        setSessionExpired(true);
      } else {
        console.log(err);
      }
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newProductData = {
      productId: props.product._id,
      productName,
      description,
      category: productCategory,
      discount,
      price,
      inStock
    }
    axios.put(`${import.meta.env.VITE_SERVER_BASE_URL}/api/products/update-product-data`, newProductData, {
      headers: {
        signintoken: localStorage.getItem("signInToken"),
        userid: localStorage.getItem("userId")
      }
    })
    .then((res) => {
      setIsEdit(false);
      setProductUpdateMessage(res.data.message);
    })
    .catch((err) => {
      if (err.response.data.message === "jwt expired") {
        setSessionExpired(true);
      } else {
        console.log(err);
      }
    });
  };

  const handleCancel = () => {
    setProductName(props.product.productName);
    setDescription(props.product.description);
    setProductCategory(props.product.category);
    setDisCount(props.product.discount);
    setPrice(props.product.price)
    setInStock(props.product.inStock);
    setIsEdit(false);
  }

  const handleSessionExpired = () => {
    localStorage.clear();
    navigate("/sign-in");
  };

  return (
    <div className="ring-2 ring-gray-400/50 p-4">
      <div className="SingleItem-image-div">
        {!productImagePath && <img src={defaultImage} alt="" className="mx-auto"/>}
        {productImagePath && <img src={import.meta.env.VITE_SERVER_BASE_URL + "/" + productImagePath} alt="" className="mx-auto"/>}
        <form className="block w-full mb-4" onSubmit={uploadProductImage} encType="multipart/form-data">
          <div className="text-center">
            <input className="w-full mt-2 border border-black px-1" type="file" accept="image/*" onChange={(e) => setProductImage(e.target.files[0])} required/>
          </div>
          <div className="text-center mt-2">
            <button type="submit" className="bg-blue-300 px-4 py-2 cursor-pointer">Upload</button>
          </div>
        </form>
      </div>
      <form className="block w-full" onSubmit={handleSave}>
        <h5 className="text-xl font-bold mt-2">Product Name:</h5>
        {!isEdit && <h5 className="bg-gray-200 p-1">{productName}</h5>}
        {isEdit && <input className="block w-full border border-black p-1" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required/>}
        <h5 className="text-xl font-bold mt-2">Description:</h5>
        {!isEdit && <p className="bg-gray-200 p-1">{description}</p>}
        {isEdit && <textarea className="w-full border border-black p-1" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>}
        <h5 className="text-xl font-bold mt-2">Category:</h5>
        {!isEdit && <h5 className="bg-gray-200 p-1">{productCategory}</h5>}
        {isEdit && <select className="block w-full border border-black p-1" value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
          {props.categories.map((category) => <option key={category._id} value={category.category}>{category.category}</option>)}
        </select>}
        <h5 className="text-xl font-bold mt-2">Discount:</h5>
        {!isEdit && <h5 className="bg-gray-200 p-1">{discount}%</h5>}
        {isEdit && <input className="block w-full border border-black p-1" type="number" min="0" max="100" step="1" value={discount} onChange={(e) => setDisCount(e.target.value)} required/>}
        <h5 className="text-xl font-bold mt-2">Price:</h5>
        {!isEdit && <h5 className="bg-gray-200 p-1">${price}</h5>}
        {isEdit && <input className="block w-full border border-black p-1" type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required/>}
        <h5 className="text-xl font-bold mt-2">In-stock:</h5>
        {!isEdit && <h5 className="bg-gray-200 p-1">{inStock}</h5>}
        {isEdit && <input className="block w-full border border-black p-1" type="number" min="0" step="1" value={inStock} onChange={(e) => setInStock(e.target.value)} required/>}
        {isEdit && <div className="text-center mt-4">
          <button className="px-4 py-2 cursor-pointer bg-green-300" type="submit">Save</button>&nbsp;
          <button className="px-4 py-2 cursor-pointer bg-red-300" onClick={handleCancel}>Cancel</button>
        </div>}
      </form>
      {productUpdateMessage && <div className="mt-2 bg-green-200">
        <div className="flex justify-between p-2">
          <p>{productUpdateMessage}</p>
          <button className="cursor-pointer" onClick={() => setProductUpdateMessage("")}>
            <FontAwesomeIcon icon={faCircleXmark}/>
          </button>
        </div>
      </div>}
      {!isEdit && <div className="text-center mt-4">
        <button className="bg-blue-300 px-4 py-2 cursor-pointer" onClick={() => setIsEdit(true)}>Edit</button>&nbsp;
        <button className="bg-red-300 px-4 py-2 cursor-pointer">Delete</button>
      </div>}

      {/* session expired modal div */}
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

export default SingleItem;
