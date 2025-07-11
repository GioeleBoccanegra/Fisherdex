import "./user.css"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import defaultImage from "../../assets/user-image.jpeg";
import EditPage from "./editPage/editPage";
import Loader from "../../components/Loader";
import { fetchUserData } from "../../api/fetchUserData"


export default function User({ setIsAuthenticated }) {

  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false);






  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const userData = await fetchUserData(setError, setIsAuthenticated, navigate);
      if (!userData) {
        // se fetchUserData fallisce, esci
        return;
      }

      setUser(userData);

      setLoading(false)
    }
    loadData();
  }, [])



  const editData = () => {
    setEdit(true);
  }


  const navigate = useNavigate();


  return (


    <div>
      {error && <div className="error-message">{error}</div>}
      <h1>User</h1>
      {loading && <Loader />}
      {!loading && !error && <div className="user-card">




        <img className="user-image" alt="User" src={defaultImage}></img>
        <p className="user-data">username: {user?.username}</p>
        <p className="user-data">provincia: {user?.provincia?.nome}</p>
        <p className="user-data">email: {user?.email}</p>
        <button onClick={() => editData()} className="edit-data">Edit data</button>

      </div>}

      {edit && <EditPage user={user} setEdit={setEdit} fetchUserData={fetchUserData} />}
    </div>
  );
}