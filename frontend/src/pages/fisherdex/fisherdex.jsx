import Fishcard from "./fishcard/fishcard";
import { useEffect, useState } from "react";
import "./fisherdex.css"
import FisherdexFilters from "./fisherdexFilters/fisherdexFiltes";
import { useNavigate } from "react-router-dom";



export default function Fisherdex({setIsAuthenticated}) {
  const [error, setError]=useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [catured, setCaptured]= useState(false);

  const [species, setSpecies]=useState([]);

 

const fetchSpeciesData=async()=>{
  const token = localStorage.getItem("token");
  if(!token){
    setError("Non Autenticato");
    setIsAuthenticated(false); // <- aggiorna stato autenticazione
    navigate("/login", {state: {sessionExpired: true}});
    return;
    
  }

  try{
    const res = await fetch("http://localhost:8080/api/specie",{
      headers:{"Authorization":`Bearer ${token}`}
    });
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
    setSpecies(data)

  }catch(error){
    setError("Errore nel recupero dei dati: " + error.message);
  }
}

useEffect(()=>{
  fetchSpeciesData();
},[]);





const filteredSpecies = species.filter((specie)=>specie.name.toLowerCase().startsWith(search.toLowerCase()));

  return (
    <div className="fisherdex-wrapper">
    <h1 className="fisherdex-title">Your Fisherdex</h1>
  
    <FisherdexFilters search={search} setSearch={setSearch}  />
  
    {error && <p className="error-message">{error}</p>}
  
    <div className="fisherdex-container">
      {filteredSpecies.length === 0 && <p className="no-results">No results found</p>}
      {filteredSpecies && filteredSpecies.map((specie) => (
        <Fishcard key={specie.id} specie={specie} setCaptured={setCaptured}/>
      ))}
    </div>
  </div>
  );
}