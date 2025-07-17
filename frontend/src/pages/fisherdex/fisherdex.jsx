import Fishcard from "./fishcard/fishcard";
import { useEffect, useState, useCallback } from "react";
import "./fisherdex.css"
import FisherdexFilters from "./fisherdexFilters/fisherdexFiltes";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader"
import { fetchGetPostsUser } from "../../api/fetchGetPostsUser"
import { fetchUserData } from "../../api/fetchUserData";
import { fetchGetSpecie } from "../../api/fetchGetSpecie"
import { useMemo } from "react";
import { getValidToken } from "../../utils/getValidToken";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";



export default function Fisherdex() {
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [postList, setPostList] = useState([]);
  const [soloNonCatturati, setSoloNonCatturati] = useState(false);
  const [modifica, setModifica] = useState(false);
  const dispatch = useDispatch();





  const getCattureUtente = useCallback(async () => {
    const token = getValidToken();
    try {
      const userData = await fetchUserData(token)
      if (!userData) {
        // se fetchUserData fallisce, esci
        setError("impossibile verificare l'utente")
        return;
      }


      setUser(userData)

      const PostsUser = await fetchGetPostsUser(userData, token)
      setPostList(PostsUser);
    } catch (err) {
      if (err.message === "Unauthorized") {
        localStorage.removeItem("token");
        dispatch(logout())
        navigate("/login", { state: { sessionExpired: true } });
      } else {
        setError(err.message)
      }
    }
  }, [setError, dispatch, navigate]);



  const fetchSpeciesData = useCallback(async () => {
    const token = getValidToken();
    try {
      const datiSpecie = await fetchGetSpecie(token);
      setSpecies(datiSpecie);
    } catch (err) {
      if (err.message === "Unauthorized") {
        localStorage.removeItem("token");
        dispatch(logout())
        navigate("/login", { state: { sessionExpired: true } });
      } else {
        setError(err.message)
      }
    }
  }, [setError, dispatch, navigate])

  useEffect(() => {



    setLoading(true)
    const loadData = async () => {
      setLoading(true);
      await fetchSpeciesData();
      await getCattureUtente();
      setLoading(false);
    }
    loadData();

  }, [modifica, fetchSpeciesData, getCattureUtente]);


  //uso useMemo per migliorare performance

  const filteredSpecies = useMemo(() => {
    let result = species;
    if (soloNonCatturati) {
      result = result.filter(specie => !postList?.some(post => post.specie.id === specie.id));
    }

    result = result.filter((specie) => specie.name.toLowerCase().startsWith(search.toLowerCase()));
    return result.slice().sort((a, b) => a.id - b.id);

  }, [species, postList, search, soloNonCatturati])





  return (
    <div className="fisherdex-wrapper">
      <h1 className="fisherdex-title">Il tuo Fisherdex</h1>
      {loading && <Loader />}
      {error && <p className="error-message" aria-live="assertive">{error}</p>}
      {!loading && !error && (
        <>
          <FisherdexFilters search={search} setSearch={setSearch} setSoloNonCatturati={setSoloNonCatturati} />
          <div className="fisherdex-container">
            {filteredSpecies.length === 0 && <p className="no-results">nessun risultato trovato</p>}
            {filteredSpecies.map((specie) => {
              const catturata = postList?.some(post => post.specie?.id === specie.id);
              return (
                <Fishcard
                  key={specie.id}
                  specie={specie}
                  catturata={catturata}
                  user={user}
                  navigate={navigate}
                  setModifica={setModifica}
                />
              );
            })}
          </div>
        </>
      )}







    </div >
  );
}