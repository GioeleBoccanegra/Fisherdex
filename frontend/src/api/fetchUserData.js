
export const fetchUserData = async (token) => {


  try {
    const res = await fetch("https://fisherdex-backend1-5eecdf4a0aac.herokuapp.com/api/users/me", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })

    if (res.status === 401 || res.status === 403) {

      throw new Error("Unauthorized");
    }


    if (!res.ok) {
      const message = await res.text();
      throw new Error("Errore nel recupero dei dati: " + message);
    }

    const data = await res.json();
    return data
  } catch (err) {
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      throw new Error("Impossibile connettersi al server. Verificare che il backend sia attivo.");
    } else {
      throw new Error("Errore nel recupero dei dati: " + (err.message || "Errore sconosciuto"));
    }
  }

}