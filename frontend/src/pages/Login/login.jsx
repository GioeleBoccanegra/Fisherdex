import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './login.css';
import { Link } from 'react-router-dom';


function Login( {setIsAuthenticated} ) {

  const [email, setEmail] = useState("")
  const[password, setPassword]=useState("")
  const [error, setError]= useState("")
  const navigate = useNavigate()

  const location = useLocation();
 const[successoRegistrazione, setSuccessoRegistrazione]= useState(location.state?.successoRegistrazione || false);

  const handleSubmit = async (e) => {
    //e è l'egento generarato da submit del form
    e.preventDefault();
    setError("");

    setSuccessoRegistrazione(false);

    try{
      //chiamata a login per verificare esistenza utente
      const res= await fetch("http://localhost:8080/api/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({email, password})      });
    if(res.ok){
  const data= await res.json();
  // Salva il token (ad esempio un JWT) nel browser dell’utente, in modo persistente (anche dopo un refresh o chiusura del tab).
  localStorage.setItem("token", data.token); // salva il token
  setIsAuthenticated(true);
  navigate("/");
}else{
  const errData= await res.text();
  setError(errData||"credenziali non valide")
}
    } catch(err){
       setError("errore nel login "+err.message)
    }
  }

  return(
    <div className='login-page'>
    <div className='login-container'>
      <h2>Login</h2>
      {error && <p style={{color: "red"}}>{error}</p>}
      {successoRegistrazione && <p style={{color: "green"}}>Registrazione effettuata con successo, ora puoi accedere con le tue credenziali</p>}
      <form onSubmit={handleSubmit}>
        <div className='email-forum-data'>
        <label>Email:</label>
        <input value={email} type='email' onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className='password-forum-data'>
        <label>Password:</label>
        <input value={password} type='password' onChange={(e)=>setPassword(e.target.value)}/>
        </div>s
        <div className='button-forum'>
          <button type='submit'>Login</button>
        </div>
        
      </form>
    </div>

    <div className='register-link'>
      <p>Non hai un account? <Link to="/register">Registrati</Link></p>
    </div>
    </div>
  )
  
}

export default Login;
