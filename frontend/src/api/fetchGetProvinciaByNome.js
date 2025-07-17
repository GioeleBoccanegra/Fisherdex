export const fetchGetProvinciaByNome = async (nome) => {

  const res = await fetch(`https://fisherdex-backend1-5eecdf4a0aac.herokuapp.com/api/province/${nome}`, {
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