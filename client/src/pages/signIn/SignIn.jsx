import "./SignIn.css";

const SignIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="SignIn mt-16 mx-auto px-8">
      <h3 className="mb-4 text-center text-3xl font-bold">Sign In</h3>
      <form className="block" onSubmit={handleSubmit}>
        <div className="mb-2">
          <h5 className="font-bold">Email</h5>
          <input className="block w-full border border-black p-1" type="email" required/>
        </div>
        <div className="mb-8">
          <h5 className="font-bold">Password</h5>
          <input className="block w-full border border-black p-1" type="password" required/>
        </div>
        <div className="text-center mt-8">
          <button className="cursor-pointer bg-blue-300 px-4 py-2" type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
};

export default SignIn;
