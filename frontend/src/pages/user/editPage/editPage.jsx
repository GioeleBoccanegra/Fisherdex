import { useState } from "react";
import defaultImage from "../../../assets/user-image.jpeg";
import "./editPage.css";

export default function EditPage({user, setEdit, fetchUserData}){
  const[username, setUsername]=useState(user.username);
  const[email, setEmail]=useState(user.email);
  const[error, setError]=useState(null);



  const salva= async(e)=>{
    e.preventDefault();
    setError(null);
try{
  const token=localStorage.getItem("token");
  const res=await fetch("http://localhost:8080/api/users/me",{
    method:"PUT",
    headers:{"Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    },
    body:JSON.stringify({
      username:username,
      email:email
    })
  })
  if(!res.ok){
    const errData = await res.text();
    setError(errData||"Errore nell'aggiornamento dei dati");
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