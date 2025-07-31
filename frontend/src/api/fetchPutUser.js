const BACKEND_URL = import.meta.env.VITE_CLOUDINARY_URL_BACKEND;

export const fecthPutUser = async (username, email, provinciaNew, token) => {
  try {
    const res = await fetch("${BACKEND_URL}/api/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        username: username,
        email: email,
        provincia: provinciaNew
      })
    })
    if (!res.ok) {
      const errData = await res.text();
      throw new Error(errData || "Errore nell'aggiornamento dei dati");
    }


    //fetchUserData(token);
  } catch (err) {
    throw new Error("Errore nell'aggiornamento dei dati: " + err.message);
  }
}