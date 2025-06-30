import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <div className="navbar">
       <Link to="/user">User</Link>
      <Link to="/">Home</Link>
      <Link to="/mappa">Mappa</Link>
      <Link to="/fisherdex">Fisherdex</Link>
     
    </div>
  );
}