import { Link } from "react-router-dom";
import "./register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register(){
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError]= useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try{
      const res=await fetch("http://localhost:8080/api/register", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username, email, password})
      })
      if(res.ok){
        navigate("/login");
      }else{
        const errData=await res.text();
        setError(errData||"errore nel registro")
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
    <form className="registerForm">
      <div>
      <label >Username</label>
      <input type="text" placeholder="pescatore126" value={username} onChange={(e) => setUsername(e.target.value)}></input>
      </div>
      <div>
      <label>Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
      </div>
      <div>
      <label>password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
      </div>
      <button type="submit" onClick={handleRegister}>register</button>
    </form>
  </div>
  <div className="login-link">
    <p>Already have an account? <Link to="/login">Login</Link></p>
  </div>
  </div>
)
}


export default Register;