import Fishcard from "./fishcard/fishcard";
import { useState } from "react";
import "./fisherdex.css"

export default function Fisherdex() {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <h1>Your Fisherdex</h1>
      
      <div className="fisherdex-container">
      <div className="filters">
        <div className="captured-fish">
          <a>captured</a>
          <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
        </div>
      </div>
      <Fishcard />
    </div>
     
      
    </div>
  );
}