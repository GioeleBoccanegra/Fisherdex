
export const fetchUserData = async (setError, setIsAuthenticated, navigate, token) => {


  try {
    const res = await fetch("http://localhost:8080/api/users/me", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })

    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      navigate("/login", { state: { sessionExpired: true } });
      return;
    }


    if (!res.ok) {
      const message = await res.text();
      setError("Errore nel recupero dei dati: " + message);
      return;
    }

    const data = await res.json();
    return data
  } catch (err) {
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      setError("Impossibile connettersi al server. Verificare che il backend sia attivo.");
    } else {
      setError("Errore nel recupero dei dati: " + (err.message || "Errore sconosciuto"));
    }
  }

}