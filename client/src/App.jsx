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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
