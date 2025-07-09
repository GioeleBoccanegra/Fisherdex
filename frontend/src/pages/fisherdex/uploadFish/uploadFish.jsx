import { useNavigate } from "react-router-dom";
import "./uploadFish.css";
import { useEffect, useState } from "react";

export default function UploadFish({setShowUploadFish, specie} ) {
const [previewUrl, setPreviewUrl] = useState(null);
const [provinciaFoto, setProvinciaFoto]= useState(null);
const[descrizione, setDescrizione]= useState("");
const navigate= useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataCaricamento = Date();
    console.log("Form submitted");
    setShowUploadFish(false);
    navigate("/fisherdex");
    console.log(provinciaFoto);
    console.log(dataCaricamento)


    //creo tabella catture che accoglie: catchID, userID(relezione con users), date, specie, provincia, description, imageUrl, city
    

    
  };

  const handleChange = (e) => {
    setDescrizione(e.target.value);
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
setProvinciaFoto(data.address.county)



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

        <div className="descrizione-cattura">
        <label htmlFor="descrizione">Descrizione:</label><br />
      <textarea
        id="descrizione"
        value={descrizione}
        onChange={handleChange}
        placeholder="Scrivi qui la tua descrizione..."
        rows={4}
        cols={50}
      />
      <p><strong>Anteprima:</strong> {descrizione}</p>
    </div>

        

        



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