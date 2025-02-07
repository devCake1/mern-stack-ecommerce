import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import SignIn from "./pages/signIn/SignIn";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout>
            <Home/>
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
