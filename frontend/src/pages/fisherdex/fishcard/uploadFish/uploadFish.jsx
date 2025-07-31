
import "./uploadFish.css";
import { useEffect, useState } from "react";
import { fetchRecuperaProvince } from "../../../../api/fetchRecuperaProvince"
import { fetchGetProvinciaByNome } from "../../../../api/fetchGetProvinciaByNome";
import { fecthPostCattura } from "../../../../api/fetchPostCattura";
import Loader from "../../../../components/Loader";
import { uploadImageToCloudinary } from "../../../../utils/uploadImageToCloudinary";
import { getValidToken } from "../../../../utils/getValidToken";


export default function UploadFish({ setShowUploadFish, specie, user, setModifica }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [provinciaFoto, setProvinciaFoto] = useState();
  const [descrizione, setDescrizione] = useState("");
  const [error, setError] = useState(false);
  const [provinceList, setProvinceList] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);




  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const token = getValidToken();
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

    if (!provinciaFoto) {
      setError("Devi inserire una provincia");
      setLoading(false);
      return;
    }
    const provinciaObj = await fetchGetProvinciaByNome(provinciaFoto);
    const urlImmagine = await uploadImageToCloudinary(imageFile);

    const dataCaricamento = new Date().toISOString();
    try {
      await fecthPostCattura(user, provinciaObj, specie, dataCaricamento, descrizione, urlImmagine, setShowUploadFish, token);
      setModifica(true);
      setLoading(false);
    } catch (err) {
      setError(err.message)
    }

  };

  const handleChange = (e) => {
    setDescrizione(e.target.value);
  };







  useEffect(() => {
    document.body.style.overflow = "hidden";
    const loadData = async () => {

      setProvinciaFoto(user.provincia.nome)


      try {
        const dataProvince = await fetchRecuperaProvince()
        setProvinceList(dataProvince)
      } catch (err) {
        setError(err.message)
      }



    }
    loadData();
    return () => {
      // Riabilita scroll quando il componente viene smontato
      document.body.style.overflow = "auto";
    };

  }, [user.provincia.nome])




  return (
    <div className="upload-fish-container-all" onClick={() => setShowUploadFish(false)}>
      <div className="upload-fish-container" onClick={(e) => e.stopPropagation()}>

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
              <label htmlFor="immagine-pesce">carica cattura</label>

              <div className="upload-fish-form-image-input">
                <input
                  disabled={loading}
                  id="immagine-pesce"
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
                          setImageFile(file);
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


              <label htmlFor="provincia">Provincia</label>
              <select id="provincia" value={provinciaFoto} onChange={(e) => setProvinciaFoto(e.target.value)} disabled={loading}>
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
                  className="input-descrizione"
                  disabled={loading}
                />
              </div>

              {error && <p className="error-message" aria-live="assertive">{error}</p>}




              {loading && <Loader />}

              {!loading && <div className="button-section-form">

                <button type="submit" disabled={loading} >Carica</button>
                <button type="button" onClick={() => setShowUploadFish(false)} disabled={loading}>Chiudi</button>
              </div>}

            </div>


          </form>
        </div>



      </div>
    </div>
  );
}