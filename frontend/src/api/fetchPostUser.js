export const fetchPostUser = async (username, provincia, email, password, navigate, setError, setLoading) => {
  try {
    const res = await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, provincia, email, password })
    })
    if (res.ok) {
      navigate("/login", { state: { successoRegistrazione: true } });
    } else {
      const errData = await res.text();
      setError(errData || "errore nella registrazione")
    }


  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
}