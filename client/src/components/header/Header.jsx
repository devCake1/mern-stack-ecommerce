import "./Header.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCircleUser, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const closeSidebar = () => {
    document.getElementById("Header-sidebar").classList.replace("Header-show-sidebar", "Header-close-sidebar");
  };

  const showSidebar = () => {
    document.getElementById("Header-sidebar").classList.replace("Header-close-sidebar", "Header-show-sidebar");
  };

  return (
    <div className="Header bg-blue-200">
      <div className="Header-logo bg-blue-300 text-center text-xl font-bold">
        Lorem Ipsum
      </div>
      <div className="Header-empty-space"></div>
      <div className="Header-menu-button-div">
        <button className="w-full h-full cursor-pointer bg-blue-300" onClick={showSidebar}>
          <FontAwesomeIcon icon={faBars} className="text-4xl"/>
        </button>
      </div>
      <div className="Header-navbar">
        <div className="Header-nav-link-div relative">
          <Link to="" className="Header-nav-link">Home</Link>
        </div>
        <div className="Header-nav-link-div relative">
          <Link to="" className="Header-nav-link">Shop</Link>
        </div>
        <div className="Header-nav-link-div relative">
          <Link to="" className="Header-nav-link">Reviews</Link>
        </div>
        <div className="Header-nav-link-div relative">
          <Link to="" className="Header-nav-link"><FontAwesomeIcon icon={faCartShopping}/></Link>
        </div>
        <div className="Header-nav-link-div Header-dropdown-div relative">
          <Link to="" className="Header-nav-link"><FontAwesomeIcon icon={faCircleUser}/></Link>
          <div className="Header-dropdown-content absolute top-full right-0 bg-blue-200">
            <div className="Header-dropdown-link-div">
              <Link to="" className="Header-dropdown-link">Sign In</Link>
            </div>
            <div className="Header-dropdown-link-div">
              <Link to="" className="Header-dropdown-link">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="Header-sidebar Header-close-sidebar bg-blue-200" id="Header-sidebar">
        <div className="absolute top-0 right-0">
          <button className="Header-sidebar-close-button bg-white cursor-pointer" onClick={closeSidebar}>
            <FontAwesomeIcon icon={faXmark}/>
          </button>
        </div>
        <div className="Header-sidebar-empty-space"></div>
        <div>
          <Link to="" className="Header-sidebar-nav-link">Home</Link>
        </div>
        <div>
          <Link to="" className="Header-sidebar-nav-link">Shop</Link>
        </div>
        <div>
          <Link to="" className="Header-sidebar-nav-link">Reviews</Link>
        </div>
        <div>
          <Link to="" className="Header-sidebar-nav-link">
            <FontAwesomeIcon icon={faCartShopping}/>
          </Link>
        </div>
        <div className="Header-sidebar-dropdown-div">
          <Link to="" className="Header-sidebar-nav-link">
            <FontAwesomeIcon icon={faCircleUser}/>
          </Link>
          <div className="Header-sidebar-dropdown-content">
            <div className="Header-sidebar-dropdown-link-div">
              <Link to="" className="Header-sidebar-dropdown-link">Sign In</Link>
            </div>
            <div className="Header-sidebar-dropdown-link-div">
              <Link to="" className="Header-sidebar-dropdown-link">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
