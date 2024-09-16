import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Typography,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Appconfig";
import { downloadDocument } from "../api";
import { Document } from "../Types";
import { formatDateTime } from "../utilities/Globalfunctions";

const getDocumentIcon = (type: string) => {
  switch (type) {
    case ".pdf":
      return <PictureAsPdfIcon />;
    case ".jpeg":
    case ".jpg":
    case ".png":
    case ".webp":
    case ".bmp":
      return <ImageIcon />;
    case ".word":
    default:
      return <InsertDriveFileIcon />;
  }
};

const DocumentTable: React.FC<{ documents: Document[] }> = ({ documents }) => {
  return (
    <TableContainer component={Paper} sx={{ minHeight: 300 }}>
      {documents.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: 3,
          }}
        >
          <Typography variant="h6" color="textSecondary">
            There is no file
          </Typography>
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Document Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Preview</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated Date</TableCell>
              <TableCell>Number of Downloads</TableCell>
              <TableCell>Download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((document: Document) => (
              <TableRow key={document.name}>
                <TableCell>{document.name}</TableCell>
                <TableCell>{document.type}</TableCell>
                <TableCell>{getDocumentIcon(document.type)}</TableCell>
                <TableCell>{formatDateTime(document.createdAt)}</TableCell>
                <TableCell>{formatDateTime(document.updatedAt)}</TableCell>
                <TableCell>{document.downloads}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => downloadDocument(document.name)}
                  >
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default DocumentTable;
