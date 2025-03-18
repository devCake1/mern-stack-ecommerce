import "./Home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SingleProduct from "../../components/singleProduct/SingleProduct";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/categories?limit=6`)
    .then((res) => {
      setCategories(res.data.categories);
    })
    .catch((err) => {
      console.log(err);
    });
    axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/products?page=1&limit=6`)
    .then((res) => {
      setProducts(res.data.products);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div>
      {/* ----- top banner ----- */}
      <div className="Home-top-banner mb-16 relative text-center">
        <div className="Home-top-banner-content text-white">
          <h3 className="text-3xl font-bold">Lorem Ipsum</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, esse! Commodi fuga unde earum temporibus eos.</p>
          <button className="button-style bg-blue-300 text-black cursor-pointer px-4 py-2" onClick={() => navigate("/shop")}>Shop Now</button>
        </div>
      </div>

      {/* ----- categories ----- */}
      <h3 className="mb-4 text-3xl font-bold text-center">Categories</h3>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center">
        {categories.map((category) => <div key={category._id}><Link className="block bg-blue-200 mx-8 my-4 p-4 bg-blue-200">{category.category}</Link></div>)}
      </div>
      <div className="text-center mt-4 mb-16">
        <button className="button-style bg-black text-white cursor-pointer px-4 py-2" onClick={() => navigate("/categories")}>View All</button>
      </div>

      {/* ----- our products ----- */}
      <h3 className="mb-6 text-3xl font-bold text-center">Our Products</h3>
      <div className="mb-16">
        <div className="Home-our-products grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => {
            return (
              <div key={product._id}>
                <SingleProduct product={product}/>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
