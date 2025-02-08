import "./SignIn.css";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const signInData = { email, password };
    axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/api/users/sign-in`, signInData)
    .then((res) => {
      if (res.data.isSuccessful) {
        setShowError("");
        localStorage.setItem("userId", res.data.user._id);
        localStorage.setItem("imgURL", res.data.user.imgURL);
        localStorage.setItem("firstName", res.data.user.firstName);
        localStorage.setItem("lastName", res.data.user.lastName);
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("isAdmin", res.data.user.isAdmin);
        localStorage.setItem("signInToken", res.data.signInToken);
        navigate("/")
      } else {
        setShowError(res.data.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    (localStorage.getItem("userId")) ? <Navigate to="/"/> : <div className="SignIn mt-16 mx-auto px-8">
      <h3 className="mb-4 text-center text-3xl font-bold">Sign In</h3>
      <form className="block" onSubmit={handleSubmit}>
        <div className="mb-2">
          <h5 className="font-bold">Email</h5>
          <input className="block w-full border border-black p-1" type="email" onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div className="mb-8">
          <h5 className="font-bold">Password</h5>
          <input className="block w-full border border-black p-1" type="password" onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <p className="text-red-600">{showError}</p>
        <div className="text-center mt-8">
          <button className="cursor-pointer bg-blue-300 px-4 py-2" type="submit">Submit</button>
        </div>
      </form>
      <p className="mt-4">Do not have an account? <Link to="" className="underline underline-offset-8">Sign Up</Link> here.</p>
    </div>
  )
};

export default SignIn;
