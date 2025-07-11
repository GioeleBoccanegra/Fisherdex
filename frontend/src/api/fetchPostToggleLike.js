export const fetchPostToggleLike = async (userId, catchId, setError) => {
  try {
    const res = await fetch(`http://localhost:8080/api/likes/${userId}/${catchId}`, {
      method: "POST"
    });


    if (!res.ok) {
      throw new Error(`Errore HTTP: ${res.status}`);
    }



    return true;
  } catch (err) {
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      setError("Impossibile connettersi al server. Verificare che il backend sia attivo.");
    } else {
      setError("Errore nel recupero dei dati: " + (err.message || "Errore sconosciuto"));
    }
  }
}