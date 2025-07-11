import "./captureCard.css"
import { useEffect, useState } from "react";
import { fetchGetCatturaSpecie } from "../../../../api/fetchGetCatturaSpecie"
import Loader from "../../../../components/Loader"

export default function CaptureCard({ specie, user, setShowCapture, showCapture }) {
  const [error, setError] = useState();
  const [catturaData, setCatturaData] = useState();
  const [loading, setLoading] = useState(false);

  //recuperare il catturaData con l'i dell'utente su quella specie


  useEffect(() => {
    const fetchCattura = async () => {
      setLoading(true);


      const datiCattura = await fetchGetCatturaSpecie(setError, user.id, specie.id);
      setCatturaData(datiCattura);
      setLoading(false);
    }
    fetchCattura();


  }, [])




  return (
    <div className="capture-card">
      {loading && <Loader />}
      {error && <p className="error-message">{error}</p>}
      {!loading && catturaData && (
        <div className="button-section-button-card">
          <div className="capture-card-data">
            <div className="catturaData-img">
              <img src={catturaData?.imageUrl} alt={catturaData.specie?.name || "specie"} />
            </div>
            <div className="catturaData-info">
              <h3>{catturaData.specie?.name} ({catturaData.specie?.scientificName})</h3>
              <p><strong>Utente:</strong> {catturaData.user?.username}</p>
              <p><strong>Provincia:</strong> {catturaData.provincia?.nome}</p>
              <p><strong>Data:</strong> {new Date(catturaData.dataCattura).toLocaleDateString()}</p>
              <p className="catturaData-desc">{catturaData.descrizione}</p>
            </div>

          </div>
          <button>elimina</button>
          <button className="close-capture-card-button" onClick={() => { setShowCapture(!showCapture) }}>close</button>
        </div>
      )}

    </div>

  )
}