import "./uploadFish.css";
import { useEffect, useState } from "react";

export default function UploadFish({setShowUploadFish, specie} ) {
const [previewUrl, setPreviewUrl] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const recuperaPosizione= async()=>{
    try{
    
    const posizioneUtente = await new Promise((resolve, reject)=>{
      navigator.geolocation.getCurrentPosition(resolve, reject)
    });

    const latitudine = posizioneUtente.coords.latitude;
    const longitudine = posizioneUtente.coords.longitude;
    console.log(posizioneUtente.coords.accuracy)

  
    
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitudine}&lon=${longitudine}&format=json`)
      const data = await response.json();
console.log(data.address.county);



  }catch(error){
    console.error("errore nel recupero della città", error)
  }
}
  
  useEffect(()=>{
  recuperaPosizione();
},[])
  

 

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

        <div className="upload-fish-form-image-input">
        <input 
            type="file" 
            accept="image/*" 
            capture="environment" 
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setPreviewUrl(URL.createObjectURL(file)); // genera l'anteprima
                }
              }} 
        />
        </div>

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