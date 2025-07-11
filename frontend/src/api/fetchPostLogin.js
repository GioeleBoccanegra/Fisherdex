export const fetchPostLogin = async (email, password, setIsAuthenticated, navigate, setError, setLoading) => {
  try {
    //chiamata a login per verificare esistenza utente
    const res = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (res.ok) {
      const data = await res.json();
      // Salva il token (ad esempio un JWT) nel browser dell’utente, in modo persistente (anche dopo un refresh o chiusura del tab).
      localStorage.setItem("token", data.token); // salva il token
      localStorage.setItem("userId", data.userId);
      setIsAuthenticated(true);
      navigate("/");
    } else {
      const errData = await res.text();
      setError(errData || "credenziali non valide")
    }
  } catch (err) {
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      setError("Impossibile connettersi al server. Verificare che il backend sia attivo.");
    } else {
      setError("Errore nel recupero dei dati: " + (err.message || "Errore sconosciuto"));
    }
  } finally {
    setLoading(false);
  }
}