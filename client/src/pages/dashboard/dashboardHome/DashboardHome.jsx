import "./DashboardHome.css";
import { useEffect } from "react";
import { Navigate, Link, Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faGift, faHouse, faPowerOff, faFileLines, faCartPlus, faBagShopping, faList, faUsers } from "@fortawesome/free-solid-svg-icons";

const DashboardHome = () => {
  let showSidebar = true;
  let x = window.matchMedia("(max-width: 768px)");
  const navigate = useNavigate();

  useEffect(() => {
    changeSidebar();
  }, []);

  const signOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const changeSidebar = () => {
    const sidebar = document.getElementById("DashboardHome-sidebar");
    const componentDiv = document.getElementById("DashboardHome-main");
    if (x.matches) {
      sidebar.classList.replace("DashboardHome-sidebar-width-1", "DashboardHome-sidebar-width-2");
      componentDiv.classList.replace("DashboardHome-main-width-1", "DashboardHome-main-width-2");
      showSidebar = false;
    } else {
      sidebar.classList.replace("DashboardHome-sidebar-width-2", "DashboardHome-sidebar-width-1");
      componentDiv.classList.replace("DashboardHome-main-width-2", "DashboardHome-main-width-1");
      showSidebar = true;
    }
  };

  x.addEventListener("change", () => {
    changeSidebar();
  });

  const toggleSidebar = () => {
    const sidebar = document.getElementById("DashboardHome-sidebar");
    const componentDiv = document.getElementById("DashboardHome-main");
    if (showSidebar) {
      sidebar.classList.replace("DashboardHome-sidebar-width-1", "DashboardHome-sidebar-width-2");
      componentDiv.classList.replace("DashboardHome-main-width-1", "DashboardHome-main-width-2");
      showSidebar = false;
    } else {
      sidebar.classList.replace("DashboardHome-sidebar-width-2", "DashboardHome-sidebar-width-1");
      componentDiv.classList.replace("DashboardHome-main-width-2", "DashboardHome-main-width-1");
      showSidebar = true;
    }
  }

  if (!localStorage.getItem("userId")) {
    return <Navigate to="/"/>
  } else {
    return (
      <div className="DashboardHome">
        <div className="DashboardHome-sidebar-width-1 float-left h-full bg-gray-900 text-white" id="DashboardHome-sidebar">
          <div className="DashboardHome-Logo">
            <h5 className="text-xl font-bold">Logo</h5>
          </div>
          {localStorage.getItem("isAdmin") === "true" && <div className="DashboardHome-sidebar-item">
            <div className="DashboardHome-sidebar-icon float-left text-center">
              <FontAwesomeIcon icon={faFileLines}/>
            </div>
            <div className="DashboardHome-sidebar-link float-left">
              <Link to="/dashboard" className="block hover:underline underline-offset-4">Overview</Link>
            </div>
          </div>}
          {localStorage.getItem("isAdmin") === "true" && <div className="DashboardHome-sidebar-item">
            <div className="DashboardHome-sidebar-icon float-left text-center">
              <FontAwesomeIcon icon={faCartPlus}/>
            </div>
            <div className="DashboardHome-sidebar-link float-left">
              <Link to="/dashboard/orders" className="block hover:underline underline-offset-4">Orders</Link>
            </div>
          </div>}
          {localStorage.getItem("isAdmin") === "true" && <div className="DashboardHome-sidebar-item">
            <div className="DashboardHome-sidebar-icon float-left text-center">
              <FontAwesomeIcon icon={faBagShopping}/>
            </div>
            <div className="DashboardHome-sidebar-link float-left">
              <Link to="/dashboard/products" className="block hover:underline underline-offset-4">Products</Link>
            </div>
          </div>}
          {localStorage.getItem("isAdmin") === "true" && <div className="DashboardHome-sidebar-item">
            <div className="DashboardHome-sidebar-icon float-left text-center">
              <FontAwesomeIcon icon={faList}/>
            </div>
            <div className="DashboardHome-sidebar-link float-left">
              <Link to="/dashboard/categories" className="block hover:underline underline-offset-4">Categories</Link>
            </div>
          </div>}
          {localStorage.getItem("isAdmin") === "true" && <div className="DashboardHome-sidebar-item">
            <div className="DashboardHome-sidebar-icon float-left text-center">
              <FontAwesomeIcon icon={faUsers}/>
            </div>
            <div className="DashboardHome-sidebar-link float-left">
              <Link to="/dashboard/users" className="block hover:underline underline-offset-4">Users</Link>
            </div>
          </div>}
          <div className="DashboardHome-sidebar-item">
            <div className="DashboardHome-sidebar-icon float-left text-center">
              <FontAwesomeIcon icon={faUser}/>
            </div>
            <div className="DashboardHome-sidebar-link float-left">
              <Link to="/dashboard/my-profile" className="block hover:underline underline-offset-4">My Profile</Link>
            </div>
          </div>
          {localStorage.getItem("isAdmin") === "false" && <div className="DashboardHome-sidebar-item">
            <div className="DashboardHome-sidebar-icon float-left text-center">
              <FontAwesomeIcon icon={faGift}/>
            </div>
            <div className="DashboardHome-sidebar-link float-left">
              <Link to="/dashboard/my-orders" className="block hover:underline underline-offset-4">My Orders</Link>
            </div>
          </div>}
          <div className="DashboardHome-sidebar-item">
            <div className="DashboardHome-sidebar-icon float-left text-center">
              <FontAwesomeIcon icon={faHouse}/>
            </div>
            <div className="DashboardHome-sidebar-link float-left">
              <Link to="/" className="block hover:underline underline-offset-4">Homepage</Link>
            </div>
          </div>
          <div className="DashboardHome-sidebar-item">
            <div className="DashboardHome-sidebar-icon float-left text-center">
              <FontAwesomeIcon icon={faPowerOff}/>
            </div>
            <div className="DashboardHome-sidebar-link float-left">
              <Link to="" className="block hover:underline underline-offset-4" onClick={signOut}>Sign Out</Link>
            </div>
          </div>
        </div>
        <div className="DashboardHome-main-width-1 float-left h-full overflow-hidden" id="DashboardHome-main">
          <div className="DashboardHome-header bg-gray-900">
            <div className="DashboardHome-header-left float-left">
              <button className="block w-full h-full cursor-pointer bg-gray-700 text-xl text-white" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars}/>
              </button>
            </div>
            <div className="DashboardHome-header-right float-left">
              <h5 className="text-xl font-bold text-white text-center">Dashboard</h5>
            </div>
          </div>
          <div className="DashboardHome-component-div w-full p-4 overflow-auto">
            <Outlet/>
          </div>
        </div>
      </div>
    );
  }
};

export default DashboardHome;
