import "./SignUp.css";
import { Navigate } from "react-router-dom";

const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    (localStorage.getItem("userId"))? <Navigate to="/"/> : <div className="SignUp mt-16 mx-auto px-8">
      <h3 className="mb-4 text-center text-3xl font-bold">Sign Up</h3>
      <form className="block" onSubmit={handleSubmit}></form>
    </div>
  );
};

export default SignUp;
