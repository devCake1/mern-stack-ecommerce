import "./Shop.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SingleProduct from "../../components/singleProduct/SingleProduct";

const Shop = () => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [defaultCategory, setDefaultCategory] = useState("All");
  const location = useLocation();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/categories?limit=6`)
    .then((res) => {
      setCategories(res.data.categories);
    })
    .catch((err) => {
      console.log(err);
    });
    const category = new URLSearchParams(location.search).get("category");
    if (category) {
      getProducts(1, 6, category);
      setDefaultCategory(category);
    } else {
      getProducts(1, 6);
    }
  }, [])

  const getProducts = (pageNumber, limit, category = "") => {
    if (totalPages && pageNumber < 1) {
      return;
    } else if (totalPages && pageNumber > totalPages) {
      return;
    }
    setProducts([]);
    window.scrollTo(0, 0);
    axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/products?page=${pageNumber}&limit=${limit}&search=${category}`)
    .then((res) => {
      if (res.data.isSuccessful) {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
        setPage(pageNumber);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  };

  const getProductsByCategory = (e) => {
    setDefaultCategory(e.target.value);
    setSearch("");
    if (e.target.value === "All") {
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
  }

  const handleSearch = (e) => {
    e.preventDefault();
    axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/products?page=${page}&limit=${itemsPerPage}&search=${search}`)
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

  return (
    <div>
      {/* shop heading and category selection */}
      <div className="px-4 py-2">
        <div className="flex flex-col sm:flex-row justify-between border-b-2 border-black pb-1">
          <h3 className="text-3xl font-bold mt-1">Shop</h3>
          <form className="mt-4 sm:mt-1">
            <span>Category: </span>
            <select className="border border-black" value={defaultCategory} onChange={getProductsByCategory}>
              <option value="All">All</option>
              {categories.map((category) => <option key={category._id} value={category.category}>{category.category}</option>)}
            </select>
          </form>
        </div>
      </div>

      {/* search form and itemsPerPage form */}
      <div className="px-4 py-2">
        <div className="flex flex-col sm:flex-row justify-between">
          <form onSubmit={handleSearch} className="mt-1">
            <input className="border border-black me-2 px-2 py-1" type="text" onChange={(e) => setSearch(e.target.value)}/>
            <button className="bg-blue-300 px-2 py-1 cursor-pointer" type="submit">Search</button>
          </form>
          <form className="mt-1">
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
      <div className="Shop-products-div mx-auto my-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => {
          return (
            <div key={product._id}>
              <SingleProduct product={product}/>
            </div>
          );
        })}
      </div>
      {totalPages && <div className="text-center mb-8">
        <span className="cursor-pointer" onClick={() => getProducts(page - 1, itemsPerPage)}>&lt;</span>&nbsp;
        <span>{page}</span>&nbsp;/&nbsp;
        <span>{totalPages}</span>&nbsp;
        <span className="cursor-pointer" onClick={() => getProducts(page + 1, itemsPerPage)}>&gt;</span>
      </div>}
    </div>
  );
};

export default Shop;
