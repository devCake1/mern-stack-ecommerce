import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import SingleItem from "./SingleItem";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(6);
  const [defaultCategory, setDefaultCategory] = useState("All");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/categories`)
    .then((res) => {
      setCategories(res.data.categories);
    })
    .catch((err) => {
      setCategories(err);
    })
    getProducts(1, 6);
  }, []);

  const getProducts = (pageNumber, limit) => {
    if (pageNumber < 1) {
      return;
    } else if (pageNumber > totalPages) {
      return;
    }
    setProducts([]);
    window.scrollTo(0, 0);
    axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/products?page=${pageNumber}&limit=${limit}`)
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
      getProducts(1, 6);
      return;
    }
    axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/products?page=${page}&limit=${6}&search=${e.target.value}`)
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

  return (
    <div>
      {localStorage.getItem("isAdmin") === "false" && <Navigate to="/dashboard/my-profile"/>}
      {localStorage.getItem("isAdmin") === "true" && <div>
        <div className="py-2">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((product) => <SingleItem key={product._id} product={product} categories={categories}/>)}
        </div>
        {(products.length > 0) && <div className="text-center">
          <span className="cursor-pointer" onClick={() => getProducts(page - 1, limit)}>&lt;</span>&nbsp;
          <span>{page}</span>&nbsp;
          <span>/</span>&nbsp;
          <span>{totalPages}</span>&nbsp;
          <span className="cursor-pointer" onClick={() => getProducts(page + 1, limit)}>&gt;</span>
        </div>}
      </div>}
    </div>
  );
};

export default Products;
