import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../../components/Loader";
import { fetchGetAllPosts } from "../../api/fetchGetAllPosts";
import { fetchUserData } from "../../api/fetchUserData"
import Apost from "./apost/Apost"


export default function Main({ setIsAuthenticated }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);


  const getPosts = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Non Autenticato");
      setIsAuthenticated(false);
      navigate("/login", { state: { sessionExpired: true } });
      return;
    }

    const userData = await fetchUserData(setError, setIsAuthenticated, navigate);
    if (!userData) {
      setError("recuper user fallito");
      return;
    }
    setUser(userData);

    const tuttiPosts = await fetchGetAllPosts(userData);
    setPosts(tuttiPosts);
  }




  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await getPosts();
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

      {posts.length == 0 && !loading && <p className="no-posts-results">No results found</p>}
      {posts.filter(post => post.user?.id != user.id)
        .map(post => (
          <Apost key={post.id} post={post} />
        ))}



    </div>
  );
}
