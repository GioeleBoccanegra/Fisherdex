import "./uploadFish.css";
export default function UploadFish({setShowUploadFish, specie} ) {
  return (
    <div className="upload-fish-container">
      <div className="upload-fish-info">
        <div className="fish-names">
      <h2>cattura di {specie.name}</h2>
      <p>{specie.scientificName}</p>
      </div>
      <div className="fish-image">
        <img src={specie.imageUrl} alt="fish" />
      </div>
      </div>
       <div className="upload-fish-form">
      <form>
       <div className="upload-fish-form-image">
        <label>Upload Fish</label>
      <input 
  type="file" 
  accept="image/*" 
  capture="environment" 
/>
</div>

      </form>
      </div>
      

<button onClick={()=>setShowUploadFish(false)}>Close</button>
    </div>
  );
}