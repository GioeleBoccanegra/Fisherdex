export const fetchGetHasLiked = async (userId, catchId, setError) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`http://localhost:8080/api/likes/check/${userId}/${catchId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    if (!res.ok) {
      throw new Error(`Errore HTTP: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      setError("Impossibile connettersi al server. Verificare che il backend sia attivo.");
    } else {
      setError("Errore nel recupero dei dati: " + (err.message || "Errore sconosciuto"));
    }
  }
};
