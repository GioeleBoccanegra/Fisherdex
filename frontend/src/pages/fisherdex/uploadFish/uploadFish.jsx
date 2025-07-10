
import "./uploadFish.css";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../../api/fetchUserData";
import { fetchRecuperaProvince } from "../../../api/fetchRecuperaProvince"
import { fecthProvinaciaByNome } from "../../../api/fetchProvinciaByNome";
import { fecthPostCattura } from "../../../api/fetchPostCattura";
import Loader from "../../../components/Loader";

export default function UploadFish({ setShowUploadFish, specie, setIsAuthenticated, navigate }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [provinciaFoto, setProvinciaFoto] = useState();
  const [descrizione, setDescrizione] = useState("");
  const [error, setError] = useState(false);
  const [provinceList, setProvinceList] = useState([]);
  const [user, setUser] = useState();
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);



  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!imageFile) {
      setError("Devi caricare un'immagine per proseguire");
      setLoading(false);
      return;
    }

    if (!descrizione) {
      setError("Devi inserire una descrizione");
      setLoading(false);
      return;
    }
    const provinciaObj = await fecthProvinaciaByNome(provinciaFoto);

    console.log(provinciaObj);
    const dataCaricamento = new Date().toISOString();
    await fecthPostCattura(user, provinciaObj, specie, dataCaricamento, descrizione, imageFile, setError, setShowUploadFish);
    setLoading(false);
  };

  const handleChange = (e) => {
    setDescrizione(e.target.value);
  };







  useEffect(() => {
    const loadData = async () => {
      const userData = await fetchUserData(setError, setIsAuthenticated, navigate)
      if (!userData) {
        // se fetchUserData fallisce, esci
        setError("impossibile verificare l'utente")
        return;
      }
      setProvinciaFoto(userData.provincia.nome)
      setUser(userData)


      await fetchRecuperaProvince(setError, setProvinceList)


    }
    loadData();

  }, [])




  return (
    <div className="upload-fish-container">
      {error && <p className="error-message">{error}</p>}
      <div className="upload-fish-info">
        <div className="fish-names">
          <h2>cattura di {specie.name}</h2>
          <p>{specie.scientificName}</p>
        </div>
        <div className="fish-image">
          <img src={specie.imageUrl} alt="fish" />
        </div>
        <div className="upload-fish-form"></div>

        <form onSubmit={handleSubmit}>
          <div className="upload-fish-form-image">
            <label>Upload Fish</label>

            <div className="upload-fish-form-image-input">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {

                    const url = URL.createObjectURL(file);
                    setPreviewUrl(URL.createObjectURL(file)); // genera l'anteprima
                    const img = new Image();
                    img.src = url;
                    img.onload = () => {
                      if (img.width < img.height) {
                        setError("per favore scatta l'immagine in orizzontale")
                        setPreviewUrl(null);
                        setImageFile(null);
                      } else {
                        setError(null);
                        setPreviewUrl(url);
                        setImageFile("testURL");
                      }
                    }
                  }
                }}
              />
            </div>

            {previewUrl && (
              <div className="preview-container">
                <p>Anteprima:</p>
                <img src={previewUrl} alt="Anteprima" className="preview-image" />
              </div>
            )}


            <label>Provincia</label>
            <select value={provinciaFoto} onChange={(e) => setProvinciaFoto(e.target.value)}>
              <option value="">Seleziona una provincia</option>
              {provinceList.map((nome) => (
                <option key={nome} value={nome}>{nome}</option>
              ))}

            </select>

            <div className="descrizione-cattura">
              <label htmlFor="descrizione">Descrizione:</label><br />
              <textarea
                id="descrizione"
                value={descrizione}
                onChange={handleChange}
                placeholder="Scrivi qui la tua descrizione..."
                rows={4}
                cols={50}
              />
              <p><strong>Anteprima:</strong> {descrizione}</p>
            </div>







            <div className="button-section-form">
              {loading && <Loader />}
              <button type="submit" >Upload</button>
              <button onClick={() => setShowUploadFish(false)} >Close</button>
            </div>
          </div>


        </form>
      </div>



    </div>
  );
}