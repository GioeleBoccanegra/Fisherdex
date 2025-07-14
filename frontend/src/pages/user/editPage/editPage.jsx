import { useState } from "react";
import defaultImage from "../../../assets/user-image.jpeg";
import "./editPage.css";
import { useEffect } from "react";
import { fetchRecuperaProvince } from "../../../api/fetchRecuperaProvince";
import { fetchGetProvinciaByNome } from "../../../api/fetchGetProvinciaByNome";
import { fecthPutUser } from "../../../api/fetchPutUser"
import { getValidToken } from "../../../utils/getValidToken"

export default function EditPage({ user, setEdit, fetchUserData, setIsAuthenticated, navigate }) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [provincia, setProvincia] = useState(user.provincia.nome);
  const [error, setError] = useState(null);
  const [provinceList, setProvinceList] = useState([]);





  const salva = async (e) => {
    e.preventDefault();
    setError(null);
    const provinciaNew = await fetchGetProvinciaByNome(provincia);
    const token = getValidToken(setError, setIsAuthenticated, navigate);
    await fecthPutUser(username, email, provinciaNew, setError, setEdit, fetchUserData, token, setIsAuthenticated, navigate)


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
      {error && <p style={{ color: "red" }}>{error}</p>}
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
            <select value={provincia} onChange={(e) => setProvincia(e.target.value)}>
              <option value="">Seleziona una provincia</option>
              {provinceList.map((nome) => (
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