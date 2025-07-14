import { Link } from "react-router-dom";
import logo from "../assets/logo-fisherdex.jpeg";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ setIsAuthenticated, isAuthenticated }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);




  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  }

  return (
    <>

      {!isAuthenticated && <nav className="navbar-no-login">
        <img src={logo} alt="logo" className="logo"></img>
        <h2 className="site-name">fisherdex</h2>
      </nav>}

      {!isAuthenticated && (<div className="div-richiesta-accesso"><p className="richiesta-accesso"> Per poter utilizzare il sito è necessario accedere con il proprio account</p></div>)}
      {isAuthenticated && (

        <nav className="navbar">

          <div className="navbar-header">
            <Link to="/" onClick={() => { setMenuOpen(false) }}><img src={logo} alt="logo" className="logo"></img></Link>

            <button className="hamburger" onClick={() => {
              setMenuOpen(!menuOpen)
            }}>
              ☰
            </button>
          </div>

          <div className={`navbar-links ${menuOpen ? "open" : ""}`}>

            <Link to="/user" onClick={() => { setMenuOpen(false) }}>User</Link>
            <Link to="/fisherdex" onClick={() => { setMenuOpen(false) }}>Fisherdex</Link>
            < div className="logout-navbar-button"> <button onClick={() => handleLogout(setIsAuthenticated)}>logout</button></div>
          </div>





        </nav>
      )}
    </>




  );
}