import "./Layout.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <Header/>
      <div className="Layout-main">
        {children}
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
