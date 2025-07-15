export const fetchDeleteCatturaSpecie = async (catchId, token) => {
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
      throw new Error("Errore nella cancellazione:", errorText);
    }


  } catch (err) {
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      throw new Error("Impossibile connettersi al server. Verificare che il backend sia attivo.");
    } else {
      throw new Error("Errore nel recupero dei dati: " + (err.message || "Errore sconosciuto"));
    }
  }

}