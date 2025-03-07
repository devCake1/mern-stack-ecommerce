import "./SignUp.css";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setShowError("Passwords do not match");
      return;
    }
    setShowError("");
    const signUpData = { firstName, lastName, email, password, confirmPassword };
    axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/api/users/sign-up`, signUpData)
    .then((res) => {
      if (res.data.isSuccessful) {
        setSignUpMessage(res.data.message);
        setFirstName("");
        setLastName("");
        setEmail("")
        setPassword("");
        setConfirmPassword("");
      } else {
        setShowError(res.data.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    (localStorage.getItem("userId"))? <Navigate to="/"/> : <div className="SignUp mt-16 mx-auto px-8">
      <h3 className="mb-4 text-center text-3xl font-bold">Sign Up</h3>
      <form className="block" onSubmit={handleSubmit}>
        <div className="mb-2">
          <h5 className="font-bold">First Name</h5>
          <input className="block w-full border border-black p-1" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
        </div>
        <div className="mb-2">
          <h5 className="font-bold">Last Name</h5>
          <input className="block w-full border border-black p-1" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
        </div>
        <div className="mb-2">
          <h5 className="font-bold">Email</h5>
          <input className="block w-full border border-black p-1" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div className="mb-2">
          <h5 className="font-bold">Password</h5>
          <input className="block w-full border border-black p-1" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <div className="mb-4">
          <h5 className="font-bold">Confirm Password</h5>
          <input className="block w-full border border-black p-1" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
        </div>
        {signUpMessage && <div className="p-2 bg-green-200">
          <div className="flex justify-between">
            <p className="pe-2">{signUpMessage}</p>
            <button className="cursor-pointer" onClick={() => setSignUpMessage("")}>
              <FontAwesomeIcon icon={faCircleXmark}/>
            </button>
          </div>
        </div>}
        <p className="text-red-600">{showError}</p>
        <div className="text-center mt-4">
          <button className="cursor-pointer bg-blue-300 px-4 py-2" type="submit">Submit</button>
        </div>
      </form>
      <p className="my-4">Already have an account? <Link to="/sign-in" className="underline underline-offset-8">Sign In</Link> here.</p>
    </div>
  );
};

export default SignUp;
