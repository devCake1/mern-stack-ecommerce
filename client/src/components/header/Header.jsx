import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCircleUser, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import MiniCart from "../miniCart/MiniCart";

const Header = () => {
  const navigate = useNavigate();

  const showSidebar = () => {
    document.getElementById("Header-sidebar").classList.replace("Header-close-sidebar", "Header-show-sidebar");
    closeMiniCartSmall();
  };

  const closeSidebar = () => {
    document.getElementById("Header-sidebar").classList.replace("Header-show-sidebar", "Header-close-sidebar");
  };

  const showMiniCartSmall = () => {
    document.getElementById("Header-mini-cart-small").classList.replace("Header-close-mini-cart-small", "Header-show-mini-cart-small");
    closeSidebar();
  };

  const closeMiniCartSmall = () => {
    document.getElementById("Header-mini-cart-small").classList.replace("Header-show-mini-cart-small", "Header-close-mini-cart-small");
  };

  const signOut = () => {
    localStorage.clear();
    navigate("/")
  };

  return (
    <div className="Header bg-blue-200 relative">
      {/* ----- header logo ----- */}
      <div className="Header-logo bg-blue-300 text-center text-xl font-bold">
        Lorem Ipsum
      </div>

      <div className="Header-empty-space"></div>

      {/* ----- header menu button ----- */}
      <div className="Header-menu-button-div">
        <button className="w-full h-full cursor-pointer bg-blue-300" onClick={showSidebar}>
          <FontAwesomeIcon icon={faBars} className="text-4xl"/>
        </button>
      </div>

      {/* ----- header navbar ----- */}
      <div className="Header-navbar">
        <div className="Header-nav-link-div relative">
          <Link to="/" className="Header-nav-link hover:bg-blue-300">Home</Link>
        </div>
        <div className="Header-nav-link-div relative">
          <Link to="/categories" className="Header-nav-link hover:bg-blue-300">Categories</Link>
        </div>
        <div className="Header-nav-link-div hover:bg-blue-300">
          <Link to="/shop" className="Header-nav-link">Shop</Link>
        </div>
        <div className="Header-nav-link-div hover:bg-blue-300">
          <Link to="/reviews" className="Header-nav-link">Reviews</Link>
        </div>
        <div className="Header-nav-link-div Header-dropdown-div hover:bg-blue-300 relative">
          <Link to="" className="Header-nav-link"><FontAwesomeIcon icon={faCartShopping}/></Link>
          <div className="Header-dropdown-content absolute top-full right-0">
            <MiniCart/>
          </div>
        </div>
        <div className="Header-nav-link-div Header-dropdown-div hover:bg-blue-300 relative">
          <Link to="" className="Header-nav-link">
            {!localStorage.getItem("imgPath") && <FontAwesomeIcon icon={faCircleUser}/>}
            {localStorage.getItem("imgPath") && <img src={import.meta.env.VITE_SERVER_BASE_URL + "/" + localStorage.getItem("imgPath")} alt="" style={{ width: "16px", height: "16px", marginTop: "15px" }}/>}
          </Link>
          <div className="Header-dropdown-content absolute top-full right-0 bg-blue-200">
            {!localStorage.getItem("userId") && <div className="Header-dropdown-link-div">
              <Link to="/sign-in" className="Header-dropdown-link hover:bg-blue-300">Sign In</Link>
            </div>}
            {!localStorage.getItem("userId") && <div className="Header-dropdown-link-div">
              <Link to="/sign-up" className="Header-dropdown-link hover:bg-blue-300">Sign Up</Link>
            </div>}
            {localStorage.getItem("userId") && <div className="Header-dropdown-link-div">
              <Link to="/dashboard" className="Header-dropdown-link hover:bg-blue-300">Dashboard</Link>
            </div>}
            {localStorage.getItem("userId") && <div className="Header-dropdown-link-div">
              <Link to="" className="Header-dropdown-link hover:bg-blue-300" onClick={signOut}>Sign Out</Link>
            </div>}
          </div>
        </div>
      </div>

      {/* ----- header sidebar ----- */}
      <div className="Header-sidebar Header-close-sidebar bg-blue-200" id="Header-sidebar">
        <div className="absolute top-0 right-0">
          <button className="Header-sidebar-close-button bg-white cursor-pointer" onClick={closeSidebar}>
            <FontAwesomeIcon icon={faXmark}/>
          </button>
        </div>
        <div className="Header-sidebar-empty-space"></div>
        <div>
          <Link to="/" className="Header-sidebar-nav-link">Home</Link>
        </div>
        <div>
          <Link to="/categories" className="Header-sidebar-nav-link">Categories</Link>
        </div>
        <div>
          <Link to="/shop" className="Header-sidebar-nav-link">Shop</Link>
        </div>
        <div>
          <Link to="/reviews" className="Header-sidebar-nav-link">Reviews</Link>
        </div>
        <div>
          <Link to="" className="Header-sidebar-nav-link" onClick={showMiniCartSmall}>
            <FontAwesomeIcon icon={faCartShopping}/>
          </Link>
        </div>
        <div className="Header-sidebar-dropdown-div">
          <Link to="" className="Header-sidebar-nav-link">
            {!localStorage.getItem("imgPath") && <FontAwesomeIcon icon={faCircleUser}/>}
            {localStorage.getItem("imgPath") && <img src={import.meta.env.VITE_SERVER_BASE_URL + "/" + localStorage.getItem("imgPath")} alt="" style={{ width: "16px", height: "16px" }}/>}
          </Link>
          <div className="Header-sidebar-dropdown-content">
            {!localStorage.getItem("userId") && <div className="Header-sidebar-dropdown-link-div">
              <Link to="/sign-in" className="Header-sidebar-dropdown-link">Sign In</Link>
            </div>}
            {!localStorage.getItem("userId") && <div className="Header-sidebar-dropdown-link-div">
              <Link to="/sign-up" className="Header-sidebar-dropdown-link">Sign Up</Link>
            </div>}
            {localStorage.getItem("userId") && <div className="Header-sidebar-dropdown-link-div">
              <Link to="/dashboard" className="Header-sidebar-dropdown-link">Dashboard</Link>
            </div>}
            {localStorage.getItem("userId") && <div className="Header-sidebar-dropdown-link-div">
              <Link to="" className="Header-sidebar-dropdown-link" onClick={signOut}>Sign Out</Link>
            </div>}
          </div>
        </div>
      </div>

      {/* header mini-cart small */}
      <div className="Header-mini-cart-small Header-close-mini-cart-small" id="Header-mini-cart-small">
        <div className="Header-mini-cart-small-close-button-div relative">
          <button className="Header-mini-cart-small-close-button absolute top-0 right-0 bg-gray-400 text-white cursor-pointer" onClick={closeMiniCartSmall}>
            <FontAwesomeIcon icon={faXmark}/>
          </button>
        </div>
        <MiniCart/>
      </div>
    </div>
  );
};

export default Header;
