import pesc from "../../../assets/pesc.jpg";
import "./fishcard.css";

export default function Fishcard() {
  return (
    <div className="fishcard">
      <div className="fishdex-position">
      <p className="fishcard-number">number</p>
      <p className="fishcard-rarity">rarity</p>
      </div>
      
<div className="description">
<h2 className="fishcard-name">name</h2>
<h3 className="fishcard-description">description</h3>    
</div>
    <div className="image-section">
    <img src={pesc} alt="fish" className="fishcard-image"></img>
    
    </div>


<div className="captured-section">
    <p className="fishcard-captured">captured</p>    
    <a className="upload-image">upload fish</a>
    </div>
    </div>
  );
}