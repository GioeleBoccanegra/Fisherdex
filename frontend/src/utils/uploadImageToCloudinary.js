import axios from "axios";
import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
import.meta.env.VITE_CLOUDINARY_CLOUD_NAME


export const uploadImageToCloudinary = async (imageFile) => {

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  // cloud_name NON va passato nel formData, è parte della URL endpoint
  formData.append("folder", "catture-utenti");

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );
    return res.data.secure_url;
  } catch (err) {
    console.error("Errore durante l'upload su Cloudinary:", err);
    throw new Error("Upload fallito");
  }
};
