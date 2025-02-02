import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout>
            <h1>This is home page</h1>
          </Layout>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
