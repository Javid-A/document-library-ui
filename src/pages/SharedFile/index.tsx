import React, { useEffect, useState } from "react";
import DocumentTable from "../../components/DocumentTable";
import axios from "axios";
import { BASE_URL } from "../../Appconfig";
import { Document } from "../../Types";
import { Box, Typography } from "@mui/material";

const SharedFile: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isInvalidToken, setInValidToken] = useState<boolean>(false);
  const fetchDocuments = async () => {
    try {
      const token = new URLSearchParams(window.location.search).get("token");

      if (!token) {
        return setInValidToken(true);
      }
      const response = await axios.get(
        `${BASE_URL}/api/documents/get-shared-file`,
        {
          params: {
            token,
          },
        }
      );
      if (response.data.succeeded) {
        const result: Document[] = [response.data.data];
        setDocuments(result);
      } else {
        setInValidToken(true);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };
  useEffect(() => {
    fetchDocuments();
  }, []);
  return isInvalidToken ? (
    <Box>
      <Typography variant="h5" sx={{ mt: 5, textAlign: "center" }}>
        Invalid access token
      </Typography>
    </Box>
  ) : (
    <DocumentTable documents={documents} />
  );
};

export default SharedFile;
