const BACKEND_URL = import.meta.env.VITE_CLOUDINARY_URL_BACKEND;
export const fetchGetSpecie = async (token) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/specie`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (res.status === 401 || res.status === 403) {
      throw new Error("Unauthorized")
    }

    if (!res.ok) {
      const message = await res.text();
      throw new Error("Errore nel recupero dei dati: " + message);
    }


    const data = await res.json();
    return data;

  } catch (err) {
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      throw new Error("Impossibile connettersi al server. Verificare che il backend sia attivo.");
    } else {
      throw new Error("Errore nel recupero dei dati: " + (err.message || "Errore sconosciuto"));
    }
  }
}