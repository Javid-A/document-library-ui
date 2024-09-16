import React, { useState } from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../Appconfig";

const FileUploadComponent: React.FC<{
  onUploadSuccess: () => void;
}> = ({ onUploadSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false); // To track the upload state
  const [uploadProgress, setUploadProgress] = useState<number | null>(null); // To track upload progress
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setSelectedFiles(files);
    setUploadSuccess(false);
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleUploadClick = async () => {
    if (!selectedFiles) return;

    const formData = new FormData();

    // Append each selected file to FormData
    Array.from(selectedFiles).forEach((file) => {
      formData.append("files", file);
    });

    try {
      setUploading(true);
      setUploadProgress(null);

      const response = await axios.post(
        `${BASE_URL}/api/documents/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              progressEvent.total
                ? (progressEvent.loaded * 100) / progressEvent.total
                : 0
            );
            setUploadProgress(progress);
          },
        }
      );
      setUploadSuccess(true);
      onUploadSuccess();
    } catch (error) {
      alert("Error uploading files.");
      console.error("Error uploading files:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      {/* Hidden input for file selection */}
      <input
        id="fileInput"
        type="file"
        multiple
        style={{ display: "none" }}
        accept=".pdf, .doc, .docx, .xls, .xlsx, .txt, image/*"
        onChange={handleFileChange}
      />

      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Select Files
      </Button>

      {selectedFiles && !uploadSuccess && (
        <>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={handleUploadClick}
            disabled={uploading} // Disable button while uploading
          >
            {uploading ? "Uploading..." : "Upload Files"}
          </Button>

          <Box sx={{ mt: 2, width: "100%", maxWidth: 400 }}>
            <Typography variant="h6" align="center" gutterBottom>
              Selected Files:
            </Typography>

            <Divider />

            {Array.from(selectedFiles).map((file, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  mt: 1,
                  lineHeight: "1.6",
                  textDecoration: "none",
                  transition: "text-decoration-color 0.3s",
                  "&:hover": {
                    textDecoration: "underline",
                    textDecorationColor: "#3f51b5",
                  },
                }}
              >
                {index + 1}. {file.name}
              </Typography>
            ))}
          </Box>
        </>
      )}

      {uploadProgress !== null && (
        <Typography sx={{ mt: 2 }}>
          Upload Progress: {uploadProgress}%
        </Typography>
      )}
    </Box>
  );
};

export default FileUploadComponent;
