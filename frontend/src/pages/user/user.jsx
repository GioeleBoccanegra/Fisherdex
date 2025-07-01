import "./user.css"
import { useNavigate } from "react-router-dom";
export default function User( {setIsAuthenticated} ) {
  const navigate = useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
    window.location.reload();
  }
  return (
    <div>
      <h1>User</h1>
      <div className="user-card">
        <image className="user-image" alt="User"></image>
        <p className="user-data">username</p>
        <p className="user-data">email</p>
        <p className="user-data">password</p>
        <p className="user-data">location</p>
        <p className="edit-data">Edit data</p>
        <button onClick={()=>handleLogout(setIsAuthenticated)}>logout</button>
      </div>
    </div>
  );
}