import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../../components/Loader";
import { fetchGetAllPosts } from "../../api/fetchGetAllPosts";
import { fetchUserData } from "../../api/fetchUserData"
import Apost from "./apost/Apost"
import { getValidToken } from "../../utils/getValidToken";


export default function Main({ setIsAuthenticated }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);


  const getPosts = async () => {
    const token = getValidToken(setError, setIsAuthenticated, navigate);

    const userData = await fetchUserData(setError, setIsAuthenticated, navigate, token);
    if (!userData) {
      setError("recuper user fallito");
      return;
    }
    setUser(userData);

    const tuttiPosts = await fetchGetAllPosts(userData, token);
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

  const filteredPosts = posts.filter(post => post.user?.id !== user.id);

  return (

    <div>

      <h1>Fisherdex</h1>
      {error && <div className="error-message">{error}</div>}
      {loading && <Loader />}
      {!loading && !error && <p>corretto</p>}
      {filteredPosts.length === 0 ? (
        <p>Nessun post trovato</p>
      ) : (
        filteredPosts.map(post => (
          <Apost key={post.id} post={post} user={user} setIsAuthenticated={setIsAuthenticated} navigate={navigate} />
        ))
      )}


    </div>
  );
}
