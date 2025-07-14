import "./Apost.css";
import { useEffect, useState } from "react";
import { fetchGetLikeCount } from "../../../api/fetchGetLikeCount"
import { fetchGetHasLiked } from "../../../api/fetchgetHasLike";
import { fetchPostToggleLike } from "../../../api/fetchPostToggleLike"
import { getValidToken } from "../../../utils/getValidToken";

export default function Apost({ post, user, setIsAuthenticated, navigate }) {
  const [error, setError] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);


  function formatSqlDate(dataCattura) {
    if (!dataCattura) return "Data non disponibile";

    // Sostituisce spazio con "T" e tronca a millisecondi
    const cleaned = dataCattura.replace(" ", "T").split(".")[0];

    const dateObj = new Date(cleaned);
    return isNaN(dateObj) ? "Data non valida" : dateObj.toLocaleDateString();
  }

  useEffect(() => {

    const loadLikeData = async () => {
      const token = getValidToken(setError, setIsAuthenticated, navigate);
      const count = await fetchGetLikeCount(post.id, setError, token)
      setLikeCount(count);

      const liked = await fetchGetHasLiked(user.id, post.id, setError, token);
      setHasLiked(liked);
    };
    if (post?.id) {
      loadLikeData()
    }


  }, [post])



  const handleLike = async () => {
    const token = getValidToken(setError, setIsAuthenticated, navigate);
    await fetchPostToggleLike(user.id, post.id, setError, token);
    console.log(post.dataCattura)
    // ricarico stato dei like

    const count = await fetchGetLikeCount(post.id, setError, token);
    const liked = await fetchGetHasLiked(user.id, post.id, setError, token);
    setLikeCount(count);
    setHasLiked(liked)

  }


  return (
    <div className="post-card">
      <div className="post-header">
        <span className="post-date">
          {formatSqlDate(post.dataCattura)}
        </span>
        <span className="post-username">{post.user?.username}</span>

      </div>
      <div className="post-img">
        <img src={post.imageUrl} alt={post.specie?.name || "specie"} />
      </div>
      <div className="post-info">
        <h3>{post.specie?.name} ({post.specie?.scientificName})</h3>
        <p><strong>Provincia:</strong> {post.provincia?.nome}</p>
        <p className="post-desc">{post.descrizione}</p>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="like-sectionj">
        <button
          className={hasLiked ? "liked" : ""}
          onClick={handleLike}
          aria-label={hasLiked ? "Togli Mi Piace" : "Metti Mi Piace"}
        >
          <span className="like-icon">{hasLiked ? "💙" : "🤍"}</span>
          <span className="like-label">{hasLiked ? "" : "Like"}</span>
          <span className="like-count">({likeCount})</span>
        </button>
      </div>

    </div>
  );

}