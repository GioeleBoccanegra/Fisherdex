import { Link } from "react-router-dom";
import logo from "../assets/logo-fisherdex.jpeg";
import "./navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/"><img src={logo} alt="logo" className="logo"></img></Link>
       <Link to="/user">User</Link>
      <Link to="/fisherdex">Fisherdex</Link>
     
    </div>
  );
}