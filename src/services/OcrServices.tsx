import { AadhaarInfo } from "@/components/DisplayData";
import axios from 'axios'

export const processAadhaarImages = async (
  frontImage: File,
  backImage: File
): Promise<AadhaarInfo> => {
  // Simulate API call delay
  const formData = new FormData();
  formData.append("frontImage", frontImage);
  formData.append("backImage", backImage);

  const response = await axios.post<AadhaarInfo>(
    `${import.meta.env.VITE_SERVER_BASEURL}/api/aadhaar-ocr-data`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;


};

export const createObjectURL = (file: File): string => {
  console.log("Creating object URL for:", file.name);
  const url = URL.createObjectURL(file);
  console.log("Created URL:", url);
  return url;
};

export const revokeObjectURL = (url: string): void => {
  if (url && url.startsWith("blob:")) {
    console.log("Revoking object URL:", url);
    URL.revokeObjectURL(url);
  }
};
