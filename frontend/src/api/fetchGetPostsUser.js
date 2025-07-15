export const fetchGetPostsUser = async (user, token) => {
  try {
    const res = await fetch(`http://localhost:8080/api/cattura/user/${user.id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!res.ok) {
      throw new Error(`Errore HTTP: ${res.status}`);
    }

    // Controlla se la risposta ha body
    const text = await res.text(); // prendi come testo per sicurezza
    if (!text) {
      throw new Error("Risposta vuota dal server");
    }

    const data = JSON.parse(text); // parse manuale

    return data
  } catch (err) {
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      throw new Error("Impossibile connettersi al server. Verificare che il backend sia attivo.");
    } else {
      throw new Error("Errore nel recupero dei dati: " + (err.message || "Errore sconosciuto"));
    }
  }
}