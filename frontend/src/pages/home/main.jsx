import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../../components/Loader"


export default function Main({ setIsAuthenticated }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState([]);

  const fetchPostsData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Non Autenticato");
      setIsAuthenticated(false);
      navigate("/login", { state: { sessionExpired: true } });
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/users/me", {
        headers: { "Authorization": `Bearer ${token}` }
      })

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login", { state: { sessionExpired: true } });
        return;
      }


      if (!res.ok) {
        const message = await res.text();
        setError("Errore nel recupero dei dati: " + message);
        return;
      }

      const data = await res.json();
      setPosts(data);
      console.log(posts);
    } catch (err) {
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        setError("Impossibile connettersi al server. Verificare che il backend sia attivo.");
      } else {
        setError("Errore nel recupero dei dati: " + (err.message || "Errore sconosciuto"));
      }
    }
  }



  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchPostsData();
      setLoading(false);
    }
    loadData();
  }, [])

  return (

    <div>

      <h1>Fisherdex</h1>
      {error && <div className="error-message">{error}</div>}
      {loading && <Loader />}
      {!loading && !error && <p>corretto</p>}

    </div>
  );
}
