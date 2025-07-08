import "./fisherdexFilters.css";
import { useState } from "react";

export default function FisherdexFilters({search, setSearch}) {
  const [checked, setChecked] = useState(false);



  return (
    <div className="fisherdex-filters">

      <div className="search-bar-fish-name">
        <input type="text" placeholder="Search by fish name" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="captured-fish">
          <a>captured</a>
          <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />

      </div>
    </div>
  );
}