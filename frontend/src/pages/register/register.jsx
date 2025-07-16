import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../../components/Loader"
import { fetchGetProvinciaByNome } from "../../api/fetchGetProvinciaByNome"
import { fetchRecuperaProvince } from "../../api/fetchRecuperaProvince"
import { fetchPostUser } from "../../api/fetchPostUser";


function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [provinceList, setProvinceList] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();








  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const listaProvince = await fetchRecuperaProvince();
        setProvinceList(listaProvince);
      } catch (err) {
        setError(err.message)
      }

      setLoading(false);
    }
    loadData();

  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const provincia = await fetchGetProvinciaByNome(selectedProvince);
      const result = await fetchPostUser(username, provincia, email, password);
      if (result) {
        navigate("/login", { state: { successoRegistrazione: true } })
      }

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false);
    }


  }

  return (
    <div className='register-page'>
      <h1>Registrati</h1>
      {error && <p style={{ color: "red" }} aria-live="assertive">{error}</p>}

      <div className="registerContainer">
        <form className="registerForm" onSubmit={handleRegister}>
          <div>
            <label htmlFor="username">Username</label>
            <input id="username" className="username-input" type="text" placeholder="pescatore126" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="provincia">Provincia</label>
            <select
              id="provincia"
              className="form-select"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
            >
              <option value="">Seleziona una provincia</option>
              {provinceList.map((nome) => (
                <option key={nome} value={nome}>
                  {nome}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" >Registrati</button>
        </form>
      </div>
      {loading && <Loader />}
      <div className="login-link">
        <p>Hai già un account? <Link to="/login">Accedi</Link></p>
      </div>


    </div>
  )
}


export default Register;