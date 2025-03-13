import "./Products.css";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import SingleItem from "./SingleItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [defaultCategory, setDefaultCategory] = useState("All");
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [productImagePreview, setProductImagePreview] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [discount, setDiscount] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [newProductMessage, setNewProductMessage] = useState("");
  const [sessionExpired, setSessionExpired] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/categories`)
    .then((res) => {
      setCategories(res.data.categories);
    })
    .catch((err) => {
      console.log(err);
    })
    getProducts(1, 6);
  }, []);

  const getProducts = (pageNumber, limit, category="") => {
    if (pageNumber < 1) {
      return;
    } else if (pageNumber > totalPages) {
      return;
    }
    if (category === "Select a category") {
      category = "";
    } else if (category === "All") {
      category = "";
    }
    setProducts([]);
    window.scrollTo(0, 0);
    axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/products?page=${pageNumber}&limit=${limit}&search=${category}`)
    .then((res) => {
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
      setPage(pageNumber);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const getProductsByCategory = (e) => {
    setDefaultCategory(e.target.value);
    if (e.target.value === "Select a category") {
      return;
    } else if (e.target.value === "All") {
      getProducts(1, itemsPerPage);
      return;
    }
    axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/products?page=${page}&limit=${itemsPerPage}&search=${e.target.value}`)
    .then((res) => {
      if (res.data.isSuccessful) {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
        setPage(1);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const changeItemsPerPage = (e) => {
    setItemsPerPage(e.target.value);
    getProducts(page, e.target.value);
  };

  const addNewProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productImage", productImage);
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("category", productCategory);
    formData.append("discount", discount);
    formData.append("price", price);
    formData.append("inStock", inStock);
    axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/api/products`, formData, {
      headers: {
        signintoken: localStorage.getItem("signInToken"),
        userid: localStorage.getItem("userId")
      }
    })
    .then((res) => {
      setNewProductMessage(res.data.message);
      setProductImagePreview(null);
      setProductImage(null);
      setProductName("");
      setDescription("");
      setProductCategory("");
      setDiscount("");
      setPrice("");
      setInStock("");
      getProducts(page, itemsPerPage, defaultCategory);
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
      {localStorage.getItem("isAdmin") === "false" && <Navigate to="/dashboard/my-profile"/>}
      {localStorage.getItem("isAdmin") === "true" && <div>
        {/* products heading and category selection */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between border-b-2 border-black pb-1">
            <h3 className="text-3xl font-bold mt-1">Products</h3>
            <form className="mt-4 sm:mt-1">
              <span>Category: </span>
              <select className="border border-black" value={defaultCategory} onChange={getProductsByCategory}>
                <option value="Select a category">Select a category</option>
                <option value="All">All</option>
                {categories.map((category) => <option key={category._id} value={category.category}>{category.category}</option>)}
              </select>
            </form>
          </div>
        </div>

        {/* add new product and change items per page */}
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row justify-between">
            <button className="px-4 py-2 bg-green-300 cursor-pointer mt-2" onClick={() => setShowNewProductModal(true)}>Add New Product</button>
            <form className="mt-2">
              <span>Items per page: </span>
              <select className="border border-black" onChange={changeItemsPerPage}>
                <option value="6">6</option>
                <option value="9">9</option>
                <option value="12">12</option>
              </select>
            </form>
          </div>
        </div>

        {/* products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((product) => <SingleItem key={product._id} product={product} categories={categories} getProducts={getProducts} page={page} itemsPerPage={itemsPerPage} defaultCategory={defaultCategory}/>)}
        </div>

        {/* pagination */}
        {(products.length > 0) && <div className="text-center">
          <span className="cursor-pointer" onClick={() => getProducts(page - 1, itemsPerPage)}>&lt;</span>&nbsp;
          <span>{page}</span>&nbsp;
          <span>/</span>&nbsp;
          <span>{totalPages}</span>&nbsp;
          <span className="cursor-pointer" onClick={() => getProducts(page + 1, itemsPerPage)}>&gt;</span>
        </div>}

        {/* add new product modal */}
        {showNewProductModal && <div className="Products-new-product">
          <div className="Products-new-product-modal bg-white overflow-y-auto">
            <div className="bg-blue-200">
              <div className="flex justify-between">
                <h5 className="text-xl p-2 font-bold">Add New Product</h5>
                <button className="bg-red-600 text-white px-4 cursor-pointer" onClick={() => setShowNewProductModal(false)}>
                  <FontAwesomeIcon icon={faXmark}/>
                </button>
              </div>
            </div>
            <form className="block w-full p-2" encType="multipart/form-data" onSubmit={addNewProduct}>
              <div className="Products-new-product-image-preview bg-gray-300 mx-auto">
                {productImagePreview && <img src={productImagePreview} alt=""/>}
              </div>
              <h6 className="text-lg font-bold mt-2">Upload Product Image:</h6>
              <input className="block w-full border border-black p-1" type="file" accept="image/*" onChange={(e) => {
                setProductImagePreview(URL.createObjectURL(e.target.files[0]));
                setProductImage(e.target.files[0]);
              }} required/>
              <h6 className="text-lg font-bold mt-2">Product Name:</h6>
              <input className="block w-full border border-black p-1" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required/>
              <h6 className="text-lg font-bold mt-2">Description:</h6>
              <textarea className="block w-full border border-black p-1" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
              <h6 className="text-lg font-bold mt-2">Category:</h6>
              <select className="block w-full border border-black p-1" onChange={(e) => setProductCategory(e.target.value)} required>
                <option value="">Select a category</option>
                {categories.map((category) => <option key={category._id} value={category.category}>{category.category}</option>)}
              </select>
              <h6 className="text-lg font-bold mt-2">Discount:</h6>
              <input className="block w-full border border-black p-1" type="number" min="0" max="100" step="1" value={discount} onChange={(e) => setDiscount(e.target.value)}/>
              <h6 className="text-lg font-bold mt-2">Price:</h6>
              <input className="block w-full border border-black p-1" type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)}/>
              <h6 className="text-lg font-bold mt-2">In-stock:</h6>
              <input className="block w-full border border-black p-1" type="number" min="0" step="1" value={inStock} onChange={(e) => setInStock(e.target.value)}/>
              {newProductMessage && <div className="bg-green-200 p-2">
                <div className="flex justify-between">
                  <p className="pe-2">{newProductMessage}</p>
                  <button className="cursor-pointer" onClick={() => setNewProductMessage("")}>
                    <FontAwesomeIcon icon={faCircleXmark}/>
                  </button>
                </div> 
              </div>}
              <div className="text-center">
                <button className="px-4 py-2 bg-blue-300 cursor-pointer mt-2" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>}

        {/* session expired modal div */}
        {sessionExpired && <div className="Session-expired-modal-div">
          <div className="Session-expired-modal bg-white p-4 text-center">
            <h3 className="text-3xl font-bold mb-4 text-blue-400">Session Expired</h3>
            <p className="mb-6">Sorry, your session has expired. Please sign-in again</p>
            <button className="px-4 py-2 bg-blue-300 cursor-pointer" onClick={handleSessionExpired}>Ok</button>
          </div>
        </div>}
      </div>}
    </div>
  );
};

export default Products;
