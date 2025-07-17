
export const fetchPostUser = async (username, provincia, email, password) => {
  try {
    const res = await fetch("https://fisherdex-backend1-5eecdf4a0aac.herokuapp.com/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, provincia, email, password })
    })
    if (res.ok) {
      return true;
    } else {
      const errData = await res.text();
      throw new Error(errData || "errore nella registrazione")
    }


  } catch {
    throw new Error("errore duarnte la registrazione, riprovare")
  }
}