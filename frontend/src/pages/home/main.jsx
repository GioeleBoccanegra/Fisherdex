import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Main({setIsAuthenticated}) {
  const [error, setError]=useState(null);
  const navigate = useNavigate();
  const [posts, setPosts]=useState([]);

  const fetchPostsData=async()=>{
    const token = localStorage.getItem("token");
    if(!token){
      setError("Non Autenticato");
      setIsAuthenticated(false);
      navigate("/login", {state: {sessionExpired: true}});
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
      setPosts(data);
      console.log(posts);
    }catch(err){
      setError("Errore nel recupero dei dati: " + (err.message || "Errore sconosciuto"));
    }
  }



useEffect(()=>{
  fetchPostsData();
},[])

  return (

    <div>
      {error && <div className="error-message">{error}</div>}
      <h1>Fisherdex</h1>
    </div>
  );
}
