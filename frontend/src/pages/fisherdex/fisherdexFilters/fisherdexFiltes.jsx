import "./fisherdexFilters.css";
import { useState } from "react";

export default function FisherdexFilters({ search, setSearch, setSoloNonCatturati }) {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
    setSoloNonCatturati(!checked);
  };



  return (
    <div className="fisherdex-filters" role="search">

      <div className="search-bar-fish-name">
        <input type="text" placeholder="cerca per nome del pesce" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="captured-fish">
        <label htmlFor="non-captured-checkbox">non catturati</label>
        <input
          id="non-captured-checkbox"
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
        />

      </div>
    </div>
  );
}