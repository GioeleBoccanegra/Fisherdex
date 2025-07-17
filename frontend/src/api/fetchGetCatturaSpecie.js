export const fetchGetCatturaSpecie = async (userId, specieId, token) => {

  const res = await fetch(`https://fisherdex-backend1-5eecdf4a0aac.herokuapp.com/api/cattura/${userId}/${specieId}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  })


  if (!res.ok) {
    const message = await res.text();
    throw new Error("Errore nel recupero dei dati: " + message);
  }
  const data = await res.json();

  return data;
}
