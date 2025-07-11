import { Link } from "react-router-dom";
import logo from "../assets/logo-fisherdex.jpeg";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  }

  return (
    <div className="navbar">
      <div className="navbar-links">
        <Link to="/"><img src={logo} alt="logo" className="logo"></img></Link>
        <Link to="/user">User</Link>
        <Link to="/fisherdex">Fisherdex</Link>
      </div>


      < div className="logout-navbar-button"> <button onClick={() => handleLogout(setIsAuthenticated)}>logout</button></div>

    </div>
  );
}