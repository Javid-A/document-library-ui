import React from "react";
import { Document } from "../Types";
import axios from "axios";
import { BASE_URL } from "../Appconfig";
import { Button, Container, Typography } from "@mui/material";

const DownloadFiles: React.FC<{ documents: Document[] }> = ({ documents }) => {
  const handleDownload = async (docs: Document[]) => {
    const array: string[] = docs.map((doc) => doc.name.trim());

    try {
      const response = await axios.post(
        `${BASE_URL}/api/documents/download-multiple`,
        array,
        {
          withCredentials: true,
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "files.zip");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading documents:", error);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        color="primary"
        onClick={() => handleDownload(documents)}
      >
        Download All files
      </Button>
    </Container>
  );
};

export default DownloadFiles;
