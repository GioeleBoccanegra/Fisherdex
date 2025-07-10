import "./Apost.css";

export default function Apost({ post }) {
  return (
    <div className="post-card">
      <div className="post-img">
        <img src={post.imageUrl} alt={post.specie?.name || "specie"} />
      </div>
      <div className="post-info">
        <h3>{post.specie?.name} ({post.specie?.scientificName})</h3>
        <p><strong>Utente:</strong> {post.user?.username}</p>
        <p><strong>Provincia:</strong> {post.provincia?.nome}</p>
        <p><strong>Data:</strong> {new Date(post.dataCattura).toLocaleDateString()}</p>
        <p className="post-desc">{post.descrizione}</p>
      </div>
    </div>
  );

}