import "./user.css"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import defaultImage from "../../assets/user-image.jpeg";
import EditPage from "./editPage/editPage";

export default function User( {setIsAuthenticated} ) {

 const[edit, setEdit]=useState(false);

  const[user, setUser]=useState(null);
  const [error, setError]=useState(null);

  
    const fetchUserData=async()=>{
      const token = localStorage.getItem("token");
      if(!token){
        setError("Non Autenticato");
        setIsAuthenticated(false);
        navigate("/login");
        return;
      }

      try{
        const res= await fetch("http://localhost:8080/api/users/me",{
          headers:{"Authorization":`Bearer ${token}`}
        })

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          navigate("/login", {state: {sessionExpired: true}});
          return;
        }


        if(!res.ok){
          const message = await res.text();
          setError("Errore nel recupero dei dati: " + message);
          return;
        }

        const data = await res.json();
        setUser(data);
      }catch(err){
        setError("Errore nel recupero dei dati: " + (err.message || "Errore sconosciuto"));
      }
    }
  
  

  useEffect(()=>{
    fetchUserData();
  },[])

  
  
const editData=()=>{
  setEdit(true);
}

  
  const navigate = useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  }
  return (
    
    
    <div>
      {error && <div className="error-message">{error}</div>}
      <h1>User</h1>
      <div className="user-card">
        <img className="user-image" alt="User" src={defaultImage}></img>
        <p className="user-data">username: {user?.username}</p>
        <p className="user-data">provincia: {user?.province?.nome}</p>
        <p className="user-data">email: {user?.email}</p>
        <button onClick={()=>editData()} className="edit-data">Edit data</button>
        <button onClick={()=>handleLogout(setIsAuthenticated)}>logout</button>
      </div>
      {edit && <EditPage user={user}  setEdit={setEdit}  fetchUserData={fetchUserData}  />}
    </div>
  );
}