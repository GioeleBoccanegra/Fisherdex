import "./captureCard.css"
import { useEffect, useState } from "react";
import { fetchGetCatturaSpecie } from "../../../../api/fetchGetCatturaSpecie"
import Loader from "../../../../components/Loader"
import AlertConfermaEliminazione from "./alertConfermaEliminazione/alertConfermEliminazione";
import { fetchDeleteCatturaSpecie } from "../../../../api/fetchDeleteCatturaSpecie"
import { getValidToken } from "../../../../utils/getValidToken";

export default function CaptureCard({ specie, user, setShowCapture }) {
  const [error, setError] = useState();
  const [catturaData, setCatturaData] = useState();
  const [loading, setLoading] = useState(false);
  const [confermaEliminazione, setConfermaEliminazione] = useState(false);
  const [alertCard, setAlertCard] = useState(false);

  //recuperare il catturaData con l'i dell'utente su quella specie

  if (confermaEliminazione) {

    const token = getValidToken()

    const eliminizioneAvvenuta = async () => {
      try {
        const avvenuta = await fetchDeleteCatturaSpecie(catturaData.id, token);
        if (avvenuta) {
          window.location.reload();
        }
      } catch (err) {
        setError(err.message)
      }
    }
    eliminizioneAvvenuta();
  }


  useEffect(() => {
    document.body.style.overflow = "hidden";
    const fetchCattura = async () => {
      setLoading(true);

      const token = getValidToken();
      try {

        const datiCattura = await fetchGetCatturaSpecie(user.id, specie.id, token);
        setCatturaData(datiCattura);
      }
      catch (err) {
        setError(err.message);
      } finally {

        setLoading(false);
      }
    }
    fetchCattura();
    return () => {
      // Riabilita scroll quando il componente viene smontato
      document.body.style.overflow = "auto";
    };

  }, [specie.id, user.id])




  return (
    <div className="captured-card-all" onClick={() => setShowCapture(false)}>


      <div className="capture-card" onClick={(e) => e.stopPropagation()} >
        {loading && <Loader />}
        {error && <p className="error-message" aria-live="assertive">{error}</p>}
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
                <p className="catturaData-desc"><strong>Descrizione cattura:</strong>{catturaData.descrizione}</p>
              </div>
              {alertCard && <AlertConfermaEliminazione setConfermaEliminazione={setConfermaEliminazione} setAlertCard={setAlertCard} />}

            </div>
            <button type="button" onClick={() => { setAlertCard(true) }} disabled={loading}>elimina</button>
            <button type="button" className="close-capture-card-button" onClick={() => { setShowCapture(false) }} disabled={loading}>chiudi</button>
          </div>

        )}

      </div>
    </div>

  )
}