export const fecthPostCattura = async (user, provincia, specie, dataCattura, descrizione, imageUrl, setError, showUploadFish, token) => {

  try {
    const res = await fetch("http://localhost:8080/api/cattura", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        "user": { "id": user.id },
        "provincia": { "id": provincia.id },
        "specie": { "id": specie.id }, dataCattura, descrizione, imageUrl
      })
    })

    if (res.ok) {
      showUploadFish(false);

    } else {
      const errData = await res.text();
      setError(errData || "error nell upload post")
    }

  } catch (err) {
    console.log(err);
  }



}