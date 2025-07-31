const BACKEND_URL = import.meta.env.VITE_CLOUDINARY_URL_BACKEND;
export const fetchGetProvinciaByNome = async (nome) => {

  const res = await fetch(`${BACKEND_URL}/api/province/${nome}`, {
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