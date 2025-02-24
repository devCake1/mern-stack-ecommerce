import { Navigate } from "react-router-dom";

const Overview = () => {
  return (
    <div>
      {(localStorage.getItem("isAdmin") === "false") && <Navigate to="/dashboard/my-profile"/>}
      {localStorage.getItem("isAdmin") === "true" && <div>
        this is Overview page
      </div>}
    </div>
  );
};

export default Overview;
