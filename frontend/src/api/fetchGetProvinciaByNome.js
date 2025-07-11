export const fetchGetProvinciaByNome = async (nome) => {

  const res = await fetch(`http://localhost:8080/api/province/${nome}`, {
    headers: {
      "Content-Type": "application/json"
    },
  });
  if (!res.ok) {
    throw new Error(`Errore HTTP: ${res.status}`);
  }
  const data = await res.json();
  return data;

}