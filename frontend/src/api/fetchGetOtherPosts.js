export const fetchGetOtherPosts = async (token, userId, provinciaId, page, size) => {


  try {

    const url = new URL("https://fisherdex-backend1-5eecdf4a0aac.herokuapp.com/api/cattura/filtrate");
    url.searchParams.append("userId", userId);
    url.searchParams.append("provinciaId", provinciaId);
    url.searchParams.append("page", page);
    url.searchParams.append("size", size);

    const res = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!res.ok) {
      throw new Error(`Errore HTTP: ${res.status}`);
    }


    // leggi la risposta come testo prima di fare JSON.parse
    const text = await res.text();

    if (!text) {
      // Risposta vuota (es. 204 No Content)
      return { content: [], totalElements: 0, totalPages: 0, page, size };
    }

    const data = JSON.parse(text);


    return data
  } catch (err) {
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      throw new Error("Impossibile connettersi al server. Verificare che il backend sia attivo.");
    } else {
      throw new Error("Errore nel recupero dei dati: " + (err.message || "Errore sconosciuto"));
    }
  }


}
