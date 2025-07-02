import { useState } from "react";
import defaultImage from "../../../assets/user-image.jpeg";
import "./editPage.css";

export default function EditPage({user, setEdit}){
  const[username, setUsername]=useState(user.username);
  const[email, setEmail]=useState(user.email);


  const salva= async()=>{
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
    throw new Error("Errore nell'aggiornamento dei dati");
  }
  const data=await res.json();
  console.log(data);
  setEdit(false);
}catch(err){
  console.log(err);
}
  }

  const esci=()=>{
setEdit(false);
  }

  


  return(
    <div className="edit-page" style={{ color: "black" }}>
  <h2 className="edit-title">Modifica i tuoi dati</h2>

  <form className="edit-form" onSubmit={()=>salva()}>
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
        />
        <label>Email</label>
        <input
          type="email"
          placeholder={user.email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </div>

    <div className="button-section">
      <button type="button" onClick={() => esci()}>Annulla</button>
      <button type="button" >Salva</button>
    </div>
  </form>
</div>

  )
}