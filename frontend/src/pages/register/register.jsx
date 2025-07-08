import { Link } from "react-router-dom";
import "./register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function Register(){
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError]= useState("");
  const [provinceList, setProvinceList] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");


  const fetchProvince = async () => {
    try{
    const res = await fetch("http://localhost:8080/api/province/names");

    if (!res.ok) {
      throw new Error(`Errore HTTP: ${res.status}`);
    }

    // Controlla se la risposta ha body
    const text = await res.text(); // prendi come testo per sicurezza
    if (!text) {
      throw new Error("Risposta vuota dal server");
    }

    const data = JSON.parse(text); // parse manuale

    // Usa i dati
    setProvinceList(data);
  } catch (error) {
    console.error("Errore fetchProvince:", error);
    setError(error.message);
  }
  }

  const getProvinciaByNome = async (nome) => {
    const res = await fetch(`http://localhost:8080/api/province/${nome}`);
    if(!res.ok){
      throw new Error(`Errore HTTP: ${res.status}`);
    }
    const data = await res.json();
    return data;
  }



useEffect(() => {
  fetchProvince();
}, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const provincia = await getProvinciaByNome(selectedProvince);
    try{
      const res=await fetch("http://localhost:8080/api/users", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username, provincia, email, password})
      })
      if(res.ok){
        navigate("/login", {state: {successoRegistrazione:true}});
      }else{
        const errData=await res.text();
        setError(errData||"errore nela registrazione")
      }
      

    }catch(err){
      console.log(err);
    }


  }

return(
  <div className='register-page'>
  <h1>register</h1>
  {error && <p style={{color: "red"}}>{error}</p>}
  <div className="registerContainer">
    <form className="registerForm" onSubmit={handleRegister}>
      <div>
      <label >Username</label>
      <input type="text" placeholder="pescatore126" value={username} onChange={(e) => setUsername(e.target.value)}></input>
      </div>
      <div>
      <label>Provincia</label>
      <select value={selectedProvince}
      onChange={(e)=> setSelectedProvince(e.target.value)}>
<option value ="">Seleziona una provincia</option>
{provinceList.map((nome)=>(
  <option key={nome} value={nome}>{nome}</option>
))}

      </select>
      </div>
      <div>
      <label>Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
      </div>
      <div>
      <label>password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
      </div>
      <button type="submit" >register</button>
    </form>
  </div>
  <div className="login-link">
    <p>Already have an account? <Link to="/login">Login</Link></p>
  </div>
  </div>
)
}


export default Register;