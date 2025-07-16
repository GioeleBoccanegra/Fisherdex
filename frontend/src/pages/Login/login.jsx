import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './login.css';
import { Link } from 'react-router-dom';
import Loader from "../../components/Loader"
import { fetchPostLogin } from '../../api/fetchPostLogin';
import { useDispatch } from 'react-redux';
import { login } from '../../features/authSlice';


function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const location = useLocation();
  const [successoRegistrazione, setSuccessoRegistrazione] = useState(location.state?.successoRegistrazione || false);

  const handleSubmit = async (e) => {
    //e è l'egento generarato da submit del form
    e.preventDefault();
    setError("");

    setSuccessoRegistrazione(false);
    setLoading(true);
    try {
      const data = await fetchPostLogin(email, password);
      localStorage.setItem("token", data.token); // salva il token
      localStorage.setItem("userId", data.userId);
      dispatch(login());
      navigate("/");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }

  }



  return (
    <div className='login-page'>
      <div className='login-container'>
        <h2>Accedi</h2>
        {error && <p style={{ color: "red" }} aria-live="assertive">{error}</p>}
        {successoRegistrazione && <p style={{ color: "green" }} aria-live="polite">Registrazione effettuata con successo, ora puoi accedere con le tue credenziali</p>}
        <form onSubmit={handleSubmit}>
          <div className='email-forum-data'>
            <label htmlFor='email'>Email:</label>
            <input id='email' value={email} type='email' onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className='password-forum-data'>
            <label htmlFor='password'>Password:</label>
            <input id='password' value={password} type='password' onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className='button-forum'>
            <button type='submit'>Accedi</button>
          </div>
          {loading && <Loader />}

        </form>
      </div>

      <div className='register-link'>
        <p>Non hai un account? <Link to="/register">Registrati</Link></p>
      </div>
    </div>
  )

}

export default Login;
