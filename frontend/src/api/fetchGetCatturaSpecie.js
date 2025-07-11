export const fetchGetCatturaSpecie = async (setError, userId, specieId, token) => {

  const res = await fetch(`http://localhost:8080/api/cattura/${userId}/${specieId}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  })


  if (!res.ok) {
    const message = await res.text();
    setError("Errore nel recupero dei dati: " + message);
    return;
  }
  const data = await res.json();
  console.log("Cattura ricevuta:", data);

  return data;
}
