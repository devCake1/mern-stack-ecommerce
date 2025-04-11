import "./Footer.css";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faLinkedin, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="Footer bg-black text-white">
      <div className="Footer-content bg-green px-5">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="mb-5">
            <h3 className="text-3xl font-bold mb-3">Lorem-Ipsum</h3>
            <div>
              <div className="Footer-icon-div float-left">
                <FontAwesomeIcon icon={faLocationDot}/>
              </div>
              <div className="float-left">
                <span>Street 1, City 1, Country-Name</span>
              </div>
            </div> <br/>
            <div>
              <div className="Footer-icon-div float-left">
                <FontAwesomeIcon icon={faPhone}/>
              </div>
              <div className="float-left">
                <span>AAA-AAAAAA</span>
              </div>
            </div> <br/>
            <div>
              <div className="Footer-icon-div float-left">
                <FontAwesomeIcon icon={faEnvelope}/>
              </div>
              <div className="float-left">
                <span>company.name@example.com</span>
              </div>
            </div> <br/>
            <div className="mt-5">
              <Link to=""><FontAwesomeIcon icon={faFacebook} className="text-2xl"/></Link>&nbsp;&nbsp;
              <Link to=""><FontAwesomeIcon icon={faTwitter} className="text-2xl"/></Link>&nbsp;&nbsp;
              <Link to=""><FontAwesomeIcon icon={faLinkedin} className="text-2xl"/></Link>&nbsp;&nbsp;
              <Link to=""><FontAwesomeIcon icon={faInstagram} className="text-2xl"/></Link>&nbsp;&nbsp;
              <Link to=""><FontAwesomeIcon icon={faWhatsapp} className="text-2xl"/></Link>&nbsp;&nbsp;
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="md:text-right">
              <h3 className="text-3xl font-bold mb-3">Discover</h3>
              <h6 className="text-lg">
                <Link to="">Link 1</Link>
              </h6>
              <h6 className="text-lg">
                <Link to="">Link 2</Link>
              </h6>
              <h6 className="text-lg">
                <Link to="">Link 3</Link>
              </h6>
              <h6 className="text-lg">
                <Link to="">Link 4</Link>
              </h6>
            </div>
            <div className="md:text-right">
              <h3 className="text-3xl font-bold mb-3">Pages</h3>
              <h6 className="text-lg">
                <Link to="">Link 1</Link>
              </h6>
              <h6 className="text-lg">
                <Link to="">Link 2</Link>
              </h6>
              <h6 className="text-lg">
                <Link to="">Link 3</Link>
              </h6>
              <h6 className="text-lg">
                <Link to="">Link 4</Link>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
