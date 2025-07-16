import { Link } from "react-router-dom";
import logo from "../assets/logo-fisherdex.jpeg";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useSelector } from "react-redux";


export default function Navbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();




  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());

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
            < div className="logout-navbar-button"> <button onClick={() => handleLogout()}>logout</button></div>
          </div>





        </nav>
      )}
    </>




  );
}