import "./EditCategories.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const EditCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryModal, setNewCategoryModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState("");
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/categories`)
    .then((res) => {
      setCategories(res.data.categories);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const addNewCategory = (e) => {
    e.preventDefault();
    const newCategoryData = { newCategory };
    axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/api/categories`, newCategoryData, {
      headers: {
        signintoken: localStorage.getItem("signInToken"),
        userid: localStorage.getItem("userId")
      }
    })
    .then((res) => {
      getCategories();
      setNewCategory("");
      setNewCategoryModal(false);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const deleteCategory = (e) => {
    e.preventDefault();
    axios.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/api/categories/${categoryIdToDelete}`, {
      headers: {
        signintoken: localStorage.getItem("signInToken"),
        userid: localStorage.getItem("userId")
      }
    })
    .then((res) => {
      getCategories();
      setCategoryIdToDelete("");
      setDeleteCategoryModal(false);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const copyId = (id) => {
    const textToCopy = document.getElementById(id).innerHTML;
    navigator.clipboard.writeText(textToCopy);
  };

  const pasteId = async () => {
    const textToPaste = await navigator.clipboard.readText();
    setCategoryIdToDelete(textToPaste);
  };

  return (
    <div>
      {localStorage.getItem("isAdmin") === "false" && <Navigate to="/dashboard/my-profile"/>}
      {localStorage.getItem("isAdmin") === "true" && <div>

        {/* heading */}
        <h3 className="text-3xl font-bold border-b-2 border-black pb-1">Categories</h3>

        {/* add or delete category */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between">
            <button className="px-4 py-2 bg-green-300 cursor-pointer mt-2" onClick={() => setNewCategoryModal(true)}>Add New Category</button>
            <button className="px-4 py-2 bg-red-300 cursor-pointer mt-2" onClick={() => setDeleteCategoryModal(true)}>Delete a Category</button>
          </div>
        </div>

        {/* categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {categories.map((category, index) => <div key={category._id} className="bg-blue-200 text-center">
            <div className="relative bg-gray-600 text-white px-4 py-8">
              <span id={index}>{category._id}</span>
              <button className="absolute top-0 right-0 text-sm p-1 bg-gray-800 cursor-pointer" onClick={() => copyId(index)}>Copy ID</button>
            </div>
            <div className="p-4">{category.category}</div>
          </div>)}
        </div>

        {/* add new category modal div */}
        {newCategoryModal && <div className="EditCategories-modal-div">
          <div className="EditCategories-modal bg-white">
            <h5 className="text-xl font-bold p-2 bg-blue-200">Add New Category</h5>
            <form className="block p-2" onSubmit={addNewCategory}>
              <h6 className="text-lg font-bold">Category Name:</h6>
              <input className="block w-full border border-black p-1" type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} required/>
              <div className="text-center mt-2">
                <button className="px-4 py-2 bg-blue-300 cursor-pointer" type="submit">Add</button>&nbsp;
                <button className="px-4 py-2 bg-gray-300 cursor-pointer" onClick={() => {
                  setNewCategoryModal(false);
                  setNewCategory("");
                }}>Close</button>
              </div>
            </form>
          </div>
        </div>}

        {/* delete a category modal div */}
        {deleteCategoryModal && <div className="EditCategories-modal-div">
          <div className="EditCategories-modal bg-white">
            <h5 className="text-xl font-bold p-2 bg-blue-200">Delete a Category</h5>
            <form className="block p-2" onSubmit={deleteCategory}>
              <h6 className="text-lg font-bold">Category ID:</h6>
              <div>
                <input className="border border-black p-1" id="EditCategories-category-id-to-delete" type="text" value={categoryIdToDelete} onChange={(e) => setCategoryIdToDelete(e.target.value)} required/> <button className="border border-orange-300 bg-orange-300 cursor-pointer p-1" onClick={pasteId}>Paste ID</button>
              </div>
              <div className="text-center mt-2">
                <button className="px-4 py-2 bg-red-300 cursor-pointer" type="submit">Delete</button>&nbsp;
                <button className="px-4 py-2 bg-gray-300 cursor-pointer" onClick={() => {
                  setDeleteCategoryModal(false);
                  setCategoryIdToDelete("");
                }}>Close</button>
              </div>
            </form>
          </div>
        </div>}
      </div>}
    </div>
  );
};

export default EditCategories;
