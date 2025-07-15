export const fecthPostCattura = async (user, provincia, specie, dataCattura, descrizione, imageUrl, showUploadFish, token) => {

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
      throw new Error(errData || "error nell upload post")
    }

  } catch {
    throw new Error("error nell upload post")
  }



}