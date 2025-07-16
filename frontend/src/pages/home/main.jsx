import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import Loader from "../../components/Loader";
import { fetchGetAllPosts } from "../../api/fetchGetAllPosts";
import { fetchUserData } from "../../api/fetchUserData"
import Apost from "./apost/Apost"
import { getValidToken } from "../../utils/getValidToken"; import "./main.css";
import "./main.css";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";

export default function Main() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);


  const getPosts = useCallback(async () => {
    const token = getValidToken();
    try {
      const userData = await fetchUserData(token);
      if (!userData) {
        setError("recuper user fallito");
        return;
      }
      setUser(userData);

      const tuttiPosts = await fetchGetAllPosts(token);
      setPosts(tuttiPosts);
    } catch (err) {
      if (err.message === "Unauthorized") {
        localStorage.removeItem("token");
        dispatch(logout())
        navigate("/login", { state: { sessionExpired: true } });
      } else {
        setError(err.message);
      }
    }
  }, [dispatch, navigate])




  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await getPosts();
      setLoading(false);
    }
    loadData();
  }, [getPosts])

  const recentSameProvincePosts = posts
    .filter(post =>
      post.user?.id !== user.id &&
      post.provincia?.id === user.provincia?.id &&
      new Date(post.dataCattura) >= sevenDaysAgo
    )
    .sort((a, b) => new Date(b.dataCattura) - new Date(a.dataCattura));

  const otherPosts = posts
    .filter(post =>
      post.user?.id !== user.id &&
      (
        post.provincia?.id !== user.provincia?.id ||
        new Date(post.dataCattura) < sevenDaysAgo
      )
    )
    .sort((a, b) => new Date(b.dataCattura) - new Date(a.dataCattura));

  const filteredPosts = [...recentSameProvincePosts, ...otherPosts];

  return (

    <div className="main-all">

      <h1 className="main-title">Nuove catture</h1>
      {error && <div className="error-message" aria-live="assertive">{error}</div>}
      {loading && <Loader />}
      {!loading && filteredPosts.length === 0 ? (
        <p>Nessun post trovato</p>
      ) : (
        filteredPosts.map(post => (
          <Apost key={post.id} post={post} user={user} />
        ))
      )}


    </div>
  );
}
