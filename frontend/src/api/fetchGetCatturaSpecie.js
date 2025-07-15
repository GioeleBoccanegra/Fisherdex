export const fetchGetCatturaSpecie = async (userId, specieId, token) => {

  const res = await fetch(`http://localhost:8080/api/cattura/${userId}/${specieId}`, {
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
