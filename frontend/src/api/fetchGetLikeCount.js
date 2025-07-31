const BACKEND_URL = import.meta.env.VITE_CLOUDINARY_URL_BACKEND;
export const fetchGetLikeCount = async (catchId, token) => {
  try {

    const res = await fetch(`${BACKEND_URL}/api/likes/count/${catchId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    if (!res.ok) throw new Error("Errore nel caricamento dei like");
    return await res.json();
  } catch (err) {
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      throw new Error("Impossibile connettersi al server. Verificare che il backend sia attivo.");
    } else {
      throw new Error("Errore nel recupero dei dati: " + (err.message || "Errore sconosciuto"));
    }
  }
};