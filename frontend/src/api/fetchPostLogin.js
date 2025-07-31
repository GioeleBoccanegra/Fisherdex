const BACKEND_URL = import.meta.env.VITE_CLOUDINARY_URL_BACKEND;
export const fetchPostLogin = async (email, password) => {

  //chiamata a login per verificare esistenza utente
  const res = await fetch("${BACKEND_URL}/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  if (res.ok) {
    const data = await res.json();
    return data;

  } else {
    const errData = await res.text();
    throw new Error(errData || "Credenziali non valide");
  }


}