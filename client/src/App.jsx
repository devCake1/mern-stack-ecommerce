import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Categories from "./pages/categories/Categories";
import Shop from "./pages/shop/Shop";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signup/SignUp";
import DashboardHome from "./pages/dashboard/dashboardHome/DashboardHome";
import Overview from "./pages/dashboard/overview/Overview";
import Orders from "./pages/dashboard/orders/Orders";
import Products from "./pages/dashboard/products/Products";
import ManageCategories from "./pages/dashboard/manageCategories/ManageCategories";
import Users from "./pages/dashboard/users/Users";
import MyProfile from "./pages/dashboard/myProfile/MyProfile";
import MyOrders from "./pages/dashboard/myOrders/MyOrders";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Layout>
            <Home/>
          </Layout>}/>
          <Route path="/categories" element={<Layout>
            <Categories/>
          </Layout>}/>
          <Route path="/shop" element={<Layout>
            <Shop/>
          </Layout>}/>
          <Route path="/product-details" element={<Layout>
            <ProductDetails/>
          </Layout>}/>
          <Route path="/cart" element={<Layout>
            <Cart/>
          </Layout>}/>
          <Route path="/sign-in" element={<Layout>
            <SignIn/>
          </Layout>}/>
          <Route path="/sign-up" element={<Layout>
            <SignUp/>
          </Layout>}/>
          <Route path="/dashboard" element={<DashboardHome/>}>
            <Route index element={<Overview/>}/>
            <Route path="/dashboard/orders" element={<Orders/>}/>
            <Route path="/dashboard/products" element={<Products/>}/>
            <Route path="/dashboard/categories" element={<ManageCategories/>}/>
            <Route path="/dashboard/users" element={<Users/>}/>
            <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
            <Route path="/dashboard/my-orders" element={<MyOrders/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
