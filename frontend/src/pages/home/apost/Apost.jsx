import "./Apost.css";
import { useEffect, useState } from "react";
import { fetchGetLikeCount } from "../../../api/fetchGetLikeCount"
import { fetchGetHasLiked } from "../../../api/fetchgetHasLike";
import { fetchPostToggleLike } from "../../../api/fetchPostToggleLike"
import { getValidToken } from "../../../utils/getValidToken";
import { useNavigate } from "react-router-dom";

export default function Apost({ post, user }) {
  const [error, setError] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const navigate = useNavigate();


  function formatSqlDate(dataCattura) {
    if (!dataCattura) return "Data non disponibile";

    // Sostituisce spazio con "T" e tronca a millisecondi
    const cleaned = dataCattura.replace(" ", "T").split(".")[0];

    const dateObj = new Date(cleaned);
    return isNaN(dateObj) ? "Data non valida" : dateObj.toLocaleDateString();
  }

  useEffect(() => {

    const loadLikeData = async () => {
      const token = getValidToken();
      try {
        const count = await fetchGetLikeCount(post.id, token)
        setLikeCount(count);

        const liked = await fetchGetHasLiked(user.id, post.id, token);
        setHasLiked(liked);
      } catch (err) {
        setError(err.message)
      }
    };
    if (post?.id) {
      loadLikeData()
    }


  }, [post, navigate, user.id])



  const handleLike = async () => {
    const token = getValidToken();
    try {
      await fetchPostToggleLike(user.id, post.id, token);

      const count = await fetchGetLikeCount(post.id, token);
      const liked = await fetchGetHasLiked(user.id, post.id, token);
      setLikeCount(count);
      setHasLiked(liked)
    } catch (err) {
      setError(err.message)
    }
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