
import "./alertConfermaEliminazione.css"
export default function alertConfermaEliminazione({ setConfermaEliminazione, setAlertCard }) {



  return (
    <div className="div-alert-conferma-eliminazione-all" onClick={() => setAlertCard(false)} >
      <div className="div-alert-conferma-eliminazione" onClick={(e) => e.stopPropagation()}>
        <h2>attenzione, confermando la cattura verrà eliminata e la specie non risulterà più come catturata. Sei sicuro di volre procedere comunque?</h2>
        <div className="alert-button">
          <button onClick={() => { setAlertCard(false) }}>annulla</button>
          <button onClick={() => { setConfermaEliminazione(true), setAlertCard(false) }}>conferma</button>
        </div>
      </div>
    </ div>
  )

}