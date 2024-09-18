import axios from "axios";
import { BASE_URL } from "../Appconfig";

export const downloadDocument = async (documentName: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/documents/download`, {
      withCredentials: true,
      responseType: "blob",
      params: {
        fileName: documentName,
      },
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", documentName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error downloading document:", error);
  }
};

export const downloadSharedDocument = async (documentName: string) => {
  try {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
      throw new Error("Invalid token");
    }
    const response = await axios.get(
      `${BASE_URL}/api/documents/download-shared-file?`,
      {
        responseType: "blob",
        params: {
          token: token,
        },
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", documentName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error downloading document:", error);
  }
};
