
import "./fishcard.css";
import UploadFish from "../uploadFish/uploadFish";
import { useState } from "react";

export default function Fishcard({ specie, catturata, user }) {

  const [showUploadFish, setShowUploadFish] = useState(false);




  let rarity_img = `/specie_img/rarita/stars_${specie.rarita}.png`;


  return (
    <div className="fishcard">
      {showUploadFish && <UploadFish setShowUploadFish={setShowUploadFish} specie={specie} user={user} />}
      <div className="fishdex-position">
        <p className="fishcard-number">N°{specie.id}</p>
        <img src={rarity_img} alt="rarità pesce :`${specie.rarita}`" className="rarity-img"></img>
      </div>

      <div className="description">
        <h2 className="fishcard-name">{specie.name}</h2>
        <h3 className="fishcard-description">specie.descrizione</h3>
      </div>
      <div className="image-section">
        <img src={specie.imageUrl} alt="fish" className="fishcard-image"></img>

      </div>


      <div className="captured-section">
        {catturata && <p className="fishcard-captured">captured</p>}
        {!catturata && <p className="fishcard-non-captured">non catturata</p> && <button className="upload-image" onClick={() => setShowUploadFish(true)}>upload fish</button>}


      </div>
    </div>
  );
}