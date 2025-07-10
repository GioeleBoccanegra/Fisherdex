import Fishcard from "./fishcard/fishcard";
import { useEffect, useState } from "react";
import "./fisherdex.css"
import FisherdexFilters from "./fisherdexFilters/fisherdexFiltes";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader"
import { fetchGetPostsUser } from "../../api/fetchGetPostsUser"
import { fetchUserData } from "../../api/fetchUserData";



export default function Fisherdex({ setIsAuthenticated }) {
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [postList, setPostList] = useState();
  const [soloNonCatturati, setSoloNonCatturati] = useState(false);




  const getCattureUtente = async () => {
    const userData = await fetchUserData(setError, setIsAuthenticated, navigate)
    if (!userData) {
      // se fetchUserData fallisce, esci
      setError("impossibile verificare l'utente")
      return;
    }


    setUser(userData)
    const PostsUser = await fetchGetPostsUser(setError, userData)
    setPostList(PostsUser);
  }



  const fetchSpeciesData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Non Autenticato");
      setIsAuthenticated(false); // <- aggiorna stato autenticazione
      navigate("/login", { state: { sessionExpired: true } });
      return;

    }

    try {
      const res = await fetch("http://localhost:8080/api/specie", {
        headers: { "Authorization": `Bearer ${token}` }
      });
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
      setSpecies(data)

    } catch (err) {
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        setError("Impossibile connettersi al server. Verificare che il backend sia attivo.");
      } else {
        setError("Errore nel recupero dei dati: " + (err.message || "Errore sconosciuto"));
      }
    }
  }

  useEffect(() => {
    setLoading(true)
    const loadData = async () => {
      setLoading(true);
      await fetchSpeciesData();
      await getCattureUtente();
    }
    loadData();
    setLoading(false);
  }, []);




  let filteredSpecies = [];
  if (soloNonCatturati == true) {
    const nonCatturati = species.filter(specie => !postList?.some(post => post.specie.id === specie.id));
    filteredSpecies = nonCatturati.filter((specie) => specie.name.toLowerCase().startsWith(search.toLowerCase()));

  } else {
    filteredSpecies = species.filter((specie) => specie.name.toLowerCase().startsWith(search.toLowerCase()));

  }


  return (
    <div className="fisherdex-wrapper">
      <h1 className="fisherdex-title">Your Fisherdex</h1>
      {loading && <Loader />}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <>
          <FisherdexFilters search={search} setSearch={setSearch} setSoloNonCatturati={setSoloNonCatturati} />
          <div className="fisherdex-container">
            {filteredSpecies.length === 0 && <p className="no-results">No results found</p>}
            {filteredSpecies.map((specie) => {
              const catturata = postList?.some(post => post.specie?.id === specie.id);
              return (
                <Fishcard
                  key={specie.id}
                  specie={specie}
                  catturata={catturata}
                  user={user}
                />
              );
            })}
          </div>
        </>
      )}







    </div >
  );
}