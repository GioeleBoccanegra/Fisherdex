import "./uploadFish.css";
import { useState } from "react";

export default function UploadFish({setShowUploadFish, specie} ) {
  const [selectedImage, setSelectedImage] = useState(null);
const [previewUrl, setPreviewUrl] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

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
      <div className="upload-fish-form"></div>
      
      <form onSubmit={handleSubmit}>
              <div className="upload-fish-form-image">
        <label>Upload Fish</label>

        
      <input 
  type="file" 
  accept="image/*" 
  capture="environment" 
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // genera l'anteprima
      }
    }}
/>
{previewUrl && (
  <div className="preview-container">
    <p>Anteprima:</p>
    <img src={previewUrl} alt="Anteprima" className="preview-image" />
  </div>
)}


<div className="button-section-form">
<button type="submit">Upload</button>
<button onClick={()=>setShowUploadFish(false)}>Close</button>
</div>
</div>
 

      </form>
      </div>
      


    </div>
  );
}