import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";
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
          <Route path="/shop" element={<Layout>
            <Shop/>
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
