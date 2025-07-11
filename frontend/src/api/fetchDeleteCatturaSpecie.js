export const fetchDeleteCatturaSpecie = async (setError, catchId, token) => {
  try {
    const res = await fetch(`http://localhost:8080/api/cattura/post/${catchId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    if (res.ok) {
      // risposta con status 2xx
      console.log("Cancellazione avvenuta con successo");
      return true;
    }
    else {
      // errore dal server
      const errorText = await res.text();
      console.error("Errore nella cancellazione:", errorText);
      return false;
    }


  } catch (err) {
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      setError("Impossibile connettersi al server. Verificare che il backend sia attivo.");
    } else {
      setError("Errore nel recupero dei dati: " + (err.message || "Errore sconosciuto"));
    }
  }

}