import { useState } from "react";
import defaultImage from "../../../assets/user-image.jpeg";
import "./editPage.css";
import { useEffect } from "react";
import { fetchRecuperaProvince } from "../../../api/fetchRecuperaProvince";
import { fetchGetProvinciaByNome } from "../../../api/fetchGetProvinciaByNome";
import { fecthPutUser } from "../../../api/fetchPutUser"
import { getValidToken } from "../../../utils/getValidToken"
import { useDispatch } from "react-redux";
import { logout } from "../../../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function EditPage({ user, setEdit }) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [provincia, setProvincia] = useState(user.provincia.nome);
  const [error, setError] = useState(null);
  const [provinceList, setProvinceList] = useState([]);
  const dispatch = useDispatch()
  const navigate = useNavigate();





  const salva = async (e) => {
    e.preventDefault();
    setError(null);
    const provinciaNew = await fetchGetProvinciaByNome(provincia);
    const token = getValidToken();
    try {
      await fecthPutUser(username, email, provinciaNew, token)
      setEdit(false);
    } catch (err) {
      if (err.message === "Unauthorized") {
        localStorage.removeItem("token");
        dispatch(logout())
        navigate("/login", { state: { sessionExpired: true } });
      } else {
        setError(err.message)
      }
    }


  }

  const esci = () => {
    setEdit(false);
  }


  useEffect(() => {
    const recuperaProvince = async () => {
      const listaProvince = await fetchRecuperaProvince(setError)
      setProvinceList(listaProvince);
    }
    recuperaProvince();
  }, [])


  return (
    <div className="edit-page" style={{ color: "black" }}>
      <h2 className="edit-title">Modifica i tuoi dati</h2>
      {error && <p style={{ color: "red" }} aria-live="assertive">{error}</p>}
      <form className="edit-form" onSubmit={salva}>
        <div className="edit-content">
          <div className="image-edit-section">
            <img src={defaultImage} alt="Foto profilo utente" />
          </div>
          <div className="data-edit-section">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder={user.username}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
              minLength={3}
              maxLength={20}
              id="username"
            />
            <label htmlFor="provincia">Provincia</label>
            <select id="provincia" value={provincia} onChange={(e) => setProvincia(e.target.value)}>
              <option value="">Seleziona una provincia</option>
              {provinceList.map((nome) => (
                <option key={nome} value={nome}>{nome}</option>
              ))}

            </select>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              id="email"
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