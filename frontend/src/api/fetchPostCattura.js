export const fecthPostCattura = async (user, provincia, specie, dataCattura, descrizione, imageUrl, setError, showUploadFish) => {

  try {
    console.log(JSON.stringify({
      "user": { "id": 1 },
      "provincia": { "id": 105 },
      "specie": { "id": 1 }, dataCattura, descrizione, imageUrl
    }))
    const res = await fetch("http://localhost:8080/api/cattura", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "user": { "id": 1 },
        "provincia": { "id": 105 },
        "specie": { "id": 1 }, dataCattura, descrizione, imageUrl
      })
    })

    if (res.ok) {
      showUploadFish(false);
      console.log("post eseguito")
    } else {
      const errData = await res.text();
      setError(errData || "error nell upload post")
    }

  } catch (err) {
    console.log(err);
  }



}