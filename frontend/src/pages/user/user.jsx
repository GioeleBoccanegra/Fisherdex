import "./user.css"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import defaultImage from "../../assets/user-image.jpeg";
import EditPage from "./editPage/editPage";
import Loader from "../../components/Loader";
import { fetchUserData } from "../../api/fetchUserData"
import { getValidToken } from "../../utils/getValidToken";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";


export default function User() {

  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();






  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const token = getValidToken();
      try {
        const userData = await fetchUserData(token);
        setUser(userData);

        setUser(userData);
      } catch (err) {
        if (err.message === "Unauthorized") {
          localStorage.removeItem("token");
          dispatch(logout())
          navigate("/login", { state: { sessionExpired: true } });
        } else {
          setError(err.message)
        }

      } finally {
        setLoading(false)
      }
    }
    loadData();
  }, [edit, navigate, dispatch])



  const editData = () => {
    setEdit(true);
  }


  //aria-live="assertive" dice al browser e al lettore di schermo:
  //Appena questo contenuto cambia, annuncialo subito, anche interrompendo ciò che stai leggendo”.


  return (


    <div className="user-container">

      {error && <div className="error-message" aria-live="assertive">{error}</div>}
      <h1>User</h1>
      {loading && <Loader />}
      {!loading && !error && <div className="user-card">




        <img className="user-image" alt="User" src={defaultImage}></img>
        <p className="user-data">username: {user?.username}</p>
        <p className="user-data">provincia: {user?.provincia?.nome}</p>
        <p className="user-data">email: {user?.email}</p>
        <button type="button" onClick={() => editData()} className="edit-data">Modifica dati</button>

      </div>}

      {edit && <EditPage user={user} setEdit={setEdit} />}
    </div>
  );
}