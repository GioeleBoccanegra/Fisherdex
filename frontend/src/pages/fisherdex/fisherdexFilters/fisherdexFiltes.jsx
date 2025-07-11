import "./fisherdexFilters.css";
import { useState } from "react";

export default function FisherdexFilters({ search, setSearch, setSoloNonCatturati }) {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
    setSoloNonCatturati(!checked);
  };



  return (
    <div className="fisherdex-filters">

      <div className="search-bar-fish-name">
        <input type="text" placeholder="Search by fish name" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="captured-fish">
        <a>non captured</a>
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