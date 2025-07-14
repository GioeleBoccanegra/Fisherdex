
import "./fishcard.css";
import UploadFish from "./uploadFish/uploadFish";
import { useState } from "react";
import CaptureCard from "./captureCard/captureCard";

export default function Fishcard({ specie, catturata, user, setIsAuthenticated, navigate, setModifica }) {

  const [showUploadFish, setShowUploadFish] = useState(false);
  const [showCapture, setShowCapture] = useState(false);





  let rarity_img = `/specie_img/rarita/stars_${specie.rarita}.png`;


  return (
    <div className="fishcard">
      {showUploadFish && <UploadFish setShowUploadFish={setShowUploadFish} specie={specie} user={user} setModifica={setModifica} setIsAuthenticated={setIsAuthenticated} navigate={navigate} />}
      {showCapture && <CaptureCard specie={specie} user={user} setShowCapture={setShowCapture} showCapture={showCapture} setIsAuthenticated={setIsAuthenticated} navigate={navigate} />}
      <div className="fishdex-position">
        <p className="fishcard-number">N°{specie.id}</p>
        <div className="description">
          <h2 className="fishcard-name">{specie.name}</h2>
        </div>
        <img src={rarity_img} alt="rarità pesce :`${specie.rarita}`" className="rarity-img"></img>
      </div>


      <div className="image-section">
        <img src={specie.imageUrl} alt="fish" className="fishcard-image"></img>

      </div>


      <div className="captured-section">
        {catturata && (
          <div className="captured-div">
            <button onClick={() => { setShowCapture(!showCapture) }}>visualizza cattura</button>
          </div>)}
        {!catturata && <p className="fishcard-non-captured">non catturata</p> && <button className="upload-image" onClick={() => setShowUploadFish(true)}>upload fish</button>}


      </div>
    </div>
  );
}