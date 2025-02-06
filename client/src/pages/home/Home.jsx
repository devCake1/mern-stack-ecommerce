import "./Home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SingleProduct from "../../components/singleProduct/SingleProduct";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/categories?limit=6")
    .then((res) => {
      setCategories(res.data.categories);
    })
    .catch((err) => {
      console.log(err);
    });
    axios.get("http://localhost:3000/api/products?page=1&limit=6")
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
      <div className="Home-top-banner margin-bottom-fifty-px relative text-center">
        <div className="Home-top-banner-content text-white">
          <h3 className="text-3xl font-bold">Lorem Ipsum</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, esse! Commodi fuga unde earum temporibus eos.</p>
          <button className="button-style bg-blue-300 text-black cursor-pointer">Shop Now</button>
        </div>
      </div>

      {/* ----- categories ----- */}
      <h3 className="margin-bottom-ten-px text-3xl font-bold text-center">Categories</h3>
      <div className="Home-categories grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center">
        {categories.map((category) => <div key={category._id}><Link className="Home-categories-link bg-blue-200">{category.category}</Link></div>)}
      </div>
      <div className="text-center margin-bottom-fifty-px margin-top-ten-px">
        <button className="button-style bg-black text-white cursor-pointer">View All</button>
      </div>

      {/* ----- our products ----- */}
      <h3 className="margin-bottom-twenty-px text-3xl font-bold text-center">Our Products</h3>
      <div className="margin-bottom-fifty-px">
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
