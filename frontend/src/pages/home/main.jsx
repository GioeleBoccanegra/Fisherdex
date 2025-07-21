import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import Loader from "../../components/Loader";
import { fetchGetOtherPosts } from "../../api/fetchGetOtherPosts";
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
  const [page, setPage] = useState(0);
  const [size] = useState(50);

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

      const tuttiPosts = await fetchGetOtherPosts(token, userData.id, userData.provincia.id, page, size);
      setPosts(tuttiPosts.content);
      setPage(0);


    } catch (err) {
      if (err.message === "Unauthorized") {
        localStorage.removeItem("token");
        dispatch(logout())
        navigate("/login", { state: { sessionExpired: true } });
      } else {
        setError(err.message);
      }
    }
  }, [dispatch, navigate, page, size])




  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await getPosts();
      setLoading(false);

    }
    loadData();
  }, [getPosts])

  const morePosts = async () => {
    if (!user) return;
    const token = getValidToken();
    const nextPage = page + 1;


    try {
      const tuttiPosts = await fetchGetOtherPosts(token, user.id, user.provincia.id, nextPage, size);
      setPosts([...posts, ...tuttiPosts.content]);
      setPage(nextPage);
    } catch (err) {
      setError(err.message);
    }
  }



  return (

    <div className="main-all">

      <h1 className="main-title">Nuove catture</h1>
      {error && <div className="error-message" aria-live="assertive">{error}</div>}
      {loading && <Loader />}
      {!loading && posts.length === 0 ? (
        <p>Nessun post trovato</p>
      ) : (
        <>
          {posts.map(post => (
            <Apost key={post.id} post={post} user={user} />
          ))}
          <button onClick={morePosts}>
            Carica altri
          </button>
        </>
      )
      }


    </div >
  );


}
