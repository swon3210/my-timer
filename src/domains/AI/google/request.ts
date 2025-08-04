import { imageFileToBase64 } from "@/utils/image";
import axios from "axios";

const GOOGLE_CLOUD_API_KEY = process.env.GOOGLE_CLOUD_API_KEY;
const GOOGLE_VISION_API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_API_KEY}`;

export const requestGoogleVisionAPI = async (
  imageFile: File
): Promise<string> => {
  const base64Image = await imageFileToBase64(imageFile);

  const response = await axios.post(GOOGLE_VISION_API_URL, {
    requests: [
      {
        image: { content: base64Image },
        features: [{ type: "TEXT_DETECTION" }],
      },
    ],
  });

  const detectedText =
    response.data.responses[0].fullTextAnnotation?.text || "";
  return detectedText;
};
