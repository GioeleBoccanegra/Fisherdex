import { useState } from "react";
import defaultImage from "../../../assets/user-image.jpeg";
import "./editPage.css";
import { useEffect } from "react";

export default function EditPage({user, setEdit, fetchUserData}){
  const[username, setUsername]=useState(user.username);
  const[email, setEmail]=useState(user.email);
  const[provincia, setProvincia]=useState(user.provincia.nome);
  const[error, setError]=useState(null);
  const[provinceList, setProvinceList]=useState([]);



  const getProvinciaByNome = async (nome) => {
    const res = await fetch(`http://localhost:8080/api/province/${nome}`);
    if(!res.ok){
      throw new Error(`Errore HTTP: ${res.status}`);
    }
    const data = await res.json();
    return data;
  }

  const salva= async(e)=>{
    e.preventDefault();
    setError(null);
    const provinciaNew=await getProvinciaByNome(provincia);
    console.log(provinciaNew);
try{
  const token=localStorage.getItem("token");
  const res=await fetch("http://localhost:8080/api/users/me",{
    method:"PUT",
    headers:{"Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    },
    body:JSON.stringify({
      username:username,
      email:email,
      provincia:provinciaNew
    })
  })
  if(!res.ok){
    const errData = await res.text();
    setError(errData||"Errore nell'aggiornamento dei dati");
    return;
  }
  const data=await res.json();
  console.log(data);
  setEdit(false);
  fetchUserData();
}catch(err){
  setError("Errore nell'aggiornamento dei dati: "+err.message);
}
  }

  const esci=()=>{
setEdit(false);
  }

  const fetchProvince=async()=>{
    try{
      const res=await fetch("http://localhost:8080/api/province/names");
      const data=await res.json();
      setProvinceList(data);
    }catch(err){
      setError("Errore nel recupero delle province: "+err.message);
    }
  }
  useEffect(()=>{
    fetchProvince();
  },[])

  
  return(
    <div className="edit-page" style={{ color: "black" }}>
  <h2 className="edit-title">Modifica i tuoi dati</h2>
  {error && <p style={{color: "red"}}>{error}</p>}
  <form className="edit-form" onSubmit={salva}>
    <div className="edit-content">
      <div className="image-edit-section">
        <img src={defaultImage} alt="User" />
      </div>
      <div className="data-edit-section">
        <label>Username</label>
        <input
          type="text"
          placeholder={user.username}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
          minLength={3}
          maxLength={20}
        />
        <label>Provincia</label>
        <select value={provincia} onChange={(e)=> setProvincia(e.target.value)}>
          <option value="">Seleziona una provincia</option>
          {provinceList.map((nome)=>(
            <option key={nome} value={nome}>{nome}</option>
          ))}

        </select>
        <label>Email</label>
        <input
          type="email"
          placeholder={user.email}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </div>
    </div>

    <div className="button-section">
      <button type="button" onClick={() => esci()}>Annulla</button>
      <button type="submit" >Salva</button>
    </div>
  </form>
</div>

  )
}