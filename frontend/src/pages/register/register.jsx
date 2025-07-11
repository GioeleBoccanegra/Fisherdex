import { Link } from "react-router-dom";
import "./register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../../components/Loader"
import { fetchGetProvinciaByNome } from "../../api/fetchGetProvinciaByNome"
import { fetchRecuperaProvince } from "../../api/fetchRecuperaProvince"
import { fetchPostUser } from "../../api/fetchPostUser";


function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [provinceList, setProvinceList] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [loading, setLoading] = useState("");








  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const listaProvince = await fetchRecuperaProvince();
      setProvinceList(listaProvince);
      setLoading(false);
    }
    loadData();

  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const provincia = await fetchGetProvinciaByNome(selectedProvince);
    await fetchPostUser(username, provincia, email, password, navigate, setError, setLoading);


  }

  return (
    <div className='register-page'>
      <h1>register</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="registerContainer">
        <form className="registerForm" onSubmit={handleRegister}>
          <div>
            <label >Username</label>
            <input type="text" placeholder="pescatore126" value={username} onChange={(e) => setUsername(e.target.value)}></input>
          </div>
          <div>
            <label>Provincia</label>
            <select value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}>
              <option value="">Seleziona una provincia</option>
              {provinceList.map((nome) => (
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
      {loading && <Loader />}
      <div className="login-link">
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>


    </div>
  )
}


export default Register;