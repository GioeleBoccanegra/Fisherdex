
export const fecthPutUser = async (username, email, provinciaNew, setError, setEdit, fetchUserData, setIsAuthenticated, navigate) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/api/users/me", {
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
      setError(errData || "Errore nell'aggiornamento dei dati");
      return;
    }
    const data = await res.json();
    console.log(data)

    setEdit(false);
    fetchUserData(setError, setIsAuthenticated, navigate, token);
  } catch (err) {
    setError("Errore nell'aggiornamento dei dati: " + err.message);
  }
}