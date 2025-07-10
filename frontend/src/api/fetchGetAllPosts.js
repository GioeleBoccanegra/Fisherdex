export const fetchGetAllPosts = async (setError) => {
  try {
    const res = await fetch("http://localhost:8080/api/cattura");

    if (!res.ok) {
      throw new Error(`Errore HTTP: ${res.status}`);
    }


    const text = await res.text(); // prendi come testo per sicurezza
    if (!text) {
      throw new Error("Risposta vuota dal server");
    }
    const data = JSON.parse(text); // parse manuale

    return data
  } catch (err) {
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      setError("Impossibile connettersi al server. Verificare che il backend sia attivo.");
    } else {
      setError("Errore nel recupero dei dati: " + (err.message || "Errore sconosciuto"));
    }
  }

}