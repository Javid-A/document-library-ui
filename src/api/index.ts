import axios from "axios";
import { BASE_URL } from "../Appconfig";

export const downloadDocument = async (documentName: string) => {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphdmlkYXNhZHVsbGF5ZXZAZ21haWwuY29tIiwibmFtZWlkIjoiMzc1YjZkMzQtMGVlZC00YTM3LTkxMDUtZWFhYTY1NGM5MjY3IiwidW5pcXVlX25hbWUiOiJqYXZpZCIsIm5iZiI6MTcyNjMzNTg4MSwiZXhwIjoxNzI2MzM5NDgxLCJpYXQiOjE3MjYzMzU4ODEsImlzcyI6IkRvY3VtZW50TGlicmFyeSIsImF1ZCI6IkRvY3VtZW50In0.9XOLmOWoHeToshWx2UPgb0NOj97O9CEe0AovFc6kCQ8";
    const response = await axios.get(
      `${BASE_URL}/api/documents/download?fileName=${documentName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        responseType: "blob",
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
