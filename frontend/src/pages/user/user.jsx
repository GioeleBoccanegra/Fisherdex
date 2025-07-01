import "./user.css"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function User( {setIsAuthenticated} ) {

  const[user, setUser]=useState(null);
  const [error, setError]=useState(null);

  useEffect(()=>{
    const fetchUserData=async()=>{
      const token = localStorage.getItem("token");
      if(!token){
        setError("Non Autenticato");
        return;
      }

      try{
        const res= await fetch("http://localhost:8080/api/users/me",{
          headers:{"Authorization":`Bearer ${token}`}
        })


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
    fetchUserData();
  },[])


  
  const navigate = useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
    window.location.reload();
  }
  return (
    
    
    <div>
      {error && <div className="error-message">{error}</div>}
      <h1>User</h1>
      <div className="user-card">
        <image className="user-image" alt="User"></image>
        <p className="user-data">username: {user?.username}</p>
        <p className="user-data">email: {user?.email}</p>
        <p className="edit-data">Edit data</p>
        <button onClick={()=>handleLogout(setIsAuthenticated)}>logout</button>
      </div>
    </div>
  );
}