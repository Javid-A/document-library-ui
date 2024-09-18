import React, { useEffect, useState } from "react";
import DocumentTable from "../../components/DocumentTable";
import UploadFiles from "../../components/UploadFiles";
import axios from "axios";
import { BASE_URL } from "../../Appconfig";
import { Document } from "../../Types";
import DownloadFiles from "../../components/DownloadFiles";
import { Button } from "@mui/material";

const Profile: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const fetchDocuments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/documents/get-files`, {
        withCredentials: true,
      });
      setDocuments(response.data.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };
  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleNewUpload = async () => {
    await fetchDocuments();
  };

  return (
    <>
      <UploadFiles onUploadSuccess={handleNewUpload} />
      <DocumentTable documents={documents} hasShare={true} />
      {documents.length > 0 && <DownloadFiles documents={documents} />}
    </>
  );
};

export default Profile;
