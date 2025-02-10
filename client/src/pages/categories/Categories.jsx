import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/categories`)
    .then((res) => {
      setCategories(res.data.categories);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <div>
      <h3 className="px-4 py-4 text-3xl font-bold text-center">Categories</h3>
      <div className="Home-categories grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center">
        {categories.map((category) => <div key={category._id}><Link className="Home-categories-link bg-blue-200" to={{ pathname: "/shop", search: `?category=${category.category}` }}>{category.category}</Link></div>)}
      </div>
    </div>
  );
};

export default Categories;
