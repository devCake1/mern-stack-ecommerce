import "./DashboardHome.css";
import { useEffect } from "react";
import { Navigate, Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faGift, faHouse, faPowerOff, faFileLines } from "@fortawesome/free-solid-svg-icons";

const DashboardHome = () => {
  let showSidebar = true;
  let x = window.matchMedia("(max-width: 768px)");

  useEffect(() => {
    changeSidebar();
  }, [])

  const changeSidebar = () => {
    const sidebar = document.getElementById("DashboardHome-sidebar");
    const componentDiv = document.getElementById("DashboardHome-component-div");
    if (x.matches) {
      sidebar.classList.replace("DashboardHome-sidebar-width-1", "DashboardHome-sidebar-width-2");
      componentDiv.classList.replace("DashboardHome-component-div-width-1", "DashboardHome-component-div-width-2");
      showSidebar = false;
    } else {
      sidebar.classList.replace("DashboardHome-sidebar-width-2", "DashboardHome-sidebar-width-1");
      componentDiv.classList.replace("DashboardHome-component-div-width-2", "DashboardHome-component-div-width-1");
      showSidebar = true;
    }
  };

  x.addEventListener("change", () => {
    changeSidebar();
  });

  const toggleSidebar = () => {
    const sidebar = document.getElementById("DashboardHome-sidebar");
    const componentDiv = document.getElementById("DashboardHome-component-div");
    if (showSidebar) {
      sidebar.classList.replace("DashboardHome-sidebar-width-1", "DashboardHome-sidebar-width-2");
      componentDiv.classList.replace("DashboardHome-component-div-width-1", "DashboardHome-component-div-width-2");
      showSidebar = false;
    } else {
      sidebar.classList.replace("DashboardHome-sidebar-width-2", "DashboardHome-sidebar-width-1");
      componentDiv.classList.replace("DashboardHome-component-div-width-2", "DashboardHome-component-div-width-1");
      showSidebar = true;
    }
  }

  if (!localStorage.getItem("userId")) {
    return <Navigate to="/"/>
  } else {
    return (
      <div className="DashboardHome">
        <div className="DashboardHome-header bg-gray-900 text-white">
          <div className="DashboardHome-header-left float-left h-full bg-gray-800">
            <h5 className="text-xl text-center w-full h-full">Dashboard</h5>
          </div>
          <div className="DashboardHome-header-right float-left h-full">
            <button className="cursor-pointer border border-2 border-white text-xl" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBars}/>
            </button>
          </div>
        </div>
        <div className="DashboardHome-main">
          <div className="DashboardHome-sidebar-width-1 float-left h-full bg-gray-900 text-white" id="DashboardHome-sidebar">
            <div>
              <Link to="/dashboard" className="block hover:bg-gray-700 px-4 py-2"><FontAwesomeIcon icon={faFileLines}/> Overview</Link>
            </div>
            {localStorage.getItem("isAdmin") === "false" && <div>
              <Link to="/dashboard/my-profile" className="block hover:bg-gray-700 px-4 py-2"><FontAwesomeIcon icon={faUser}/> My Profile</Link>
            </div>}
            {localStorage.getItem("isAdmin") === "false" && <div>
              <Link to="/dashboard/my-orders" className="block hover:bg-gray-700 px-4 py-2"><FontAwesomeIcon icon={faGift}/> My Orders</Link>
            </div>}
            <div>
              <Link to="/" className="block hover:bg-gray-700 px-4 py-2"><FontAwesomeIcon icon={faHouse}/> Homepage</Link>
            </div>
            <div>
              <Link to="" className="block hover:bg-gray-700 px-4 py-2"><FontAwesomeIcon icon={faPowerOff}/> Sign Out</Link>
            </div>
          </div>
          <div className="DashboardHome-component-div-width-1 float-left h-full overflow-auto p-4" id="DashboardHome-component-div">
            <Outlet/>
          </div>
        </div>
      </div>
    );
  }
};

export default DashboardHome;
