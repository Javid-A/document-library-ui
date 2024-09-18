import React, { ReactNode, useEffect, useState } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import ShareIcon from "@mui/icons-material/Share";
import { downloadDocument, downloadSharedDocument } from "../api";
import { Document } from "../Types";
import { formatDateTime } from "../utilities/Globalfunctions";
import axios from "axios";
import { BASE_URL } from "../Appconfig";
import pdf from "../assets/pdf.png";
import xlsx from "../assets/xlsx.png";
import docx from "../assets/docx.png";
import image from "../assets/image.png";

const getDocumentIcon = (type: string) => {
  switch (type) {
    case ".pdf":
      return <Box component="img" sx={{ width: 50 }} src={pdf} />;
    case ".jpeg":
    case ".jpg":
    case ".png":
    case ".webp":
    case ".bmp":
      return <Box component="img" sx={{ width: 50 }} src={image} />;
    case ".docx":
      return <Box component="img" sx={{ width: 50 }} src={docx} />;
    case ".xlsx":
      return <Box component="img" sx={{ width: 50 }} src={xlsx} />;
    default:
      return <InsertDriveFileIcon />;
  }
};

const DocumentTable: React.FC<{
  documents: Document[];
  hasShare?: boolean;
}> = ({ documents, hasShare }) => {
  const [open, setOpen] = useState(false);
  const [shareTime, setShareTime] = useState<number>(1);
  const [sharedFileName, setSharedFileName] = useState<string | undefined>(
    undefined
  );
  const [shareLink, setShareLink] = useState<string>(
    "Click button to generate link"
  );

  // Open the popup and generate the link (replace with your actual link generation logic)
  const handleShareClick = async () => {
    const response = await axios.post(
      `${BASE_URL}/api/documents/share`,
      {},
      {
        params: {
          fileName: sharedFileName,
          expirationInHours: shareTime,
        },
        withCredentials: true,
      }
    );

    if (response.data.succeeded) {
      const generatedLink =
        "http://localhost:3000/get-shared-file?token=" + response.data.data;
      setShareLink(generatedLink);
      navigator.clipboard.writeText(generatedLink);
    } else {
      setShareLink("Error occurred while generating link");
    }
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
    setShareLink("");
    setSharedFileName(undefined);
  };

  return (
    <TableContainer component={Paper}>
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
            {hasShare ? "There is no file" : "Token was expired"}
          </Typography>
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Document Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Icon</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Preview</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Created At</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Updated Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Number of Downloads
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Download</TableCell>
              {hasShare && (
                <TableCell sx={{ fontWeight: "bold" }}>Link</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((document: Document, index) => (
              <TableRow key={document.name}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{document.name}</TableCell>
                <TableCell>{document.type}</TableCell>
                <TableCell>{getDocumentIcon(document.type)}</TableCell>
                <TableCell>
                  <Box
                    width={65}
                    component="img"
                    src={document.thumbnailURL}
                    alt="thumbnail"
                  />
                </TableCell>
                <TableCell>{formatDateTime(document.createdAt)}</TableCell>
                <TableCell>{formatDateTime(document.updatedAt)}</TableCell>
                <TableCell>{document.downloads}</TableCell>
                <TableCell>
                  {hasShare ? (
                    <Button
                      variant="contained"
                      onClick={() => downloadDocument(document.name)}
                    >
                      Download
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => downloadSharedDocument(document.name)}
                    >
                      Download
                    </Button>
                  )}
                </TableCell>
                {hasShare && (
                  <TableCell>
                    <Button
                      size="small"
                      sx={{ color: "black" }}
                      onClick={() => {
                        setOpen(true);
                        setSharedFileName(document.name.trim());
                      }}
                    >
                      <ShareIcon />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Share Popup */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Share Document</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Generate link to share this document:
          </DialogContentText>
          <TextField
            value={shareLink || "Click button to generate link"}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            sx={{ mt: 2 }}
          />
          <TextField
            select
            label="Expiration Time"
            fullWidth
            value={shareTime}
            onChange={(e) => setShareTime(parseInt(e.target.value))}
            sx={{ mt: 2 }}
          >
            <MenuItem value={1}>1 Hour</MenuItem>
            <MenuItem value={6}>6 Hours</MenuItem>
            <MenuItem value={12}>12 Hours</MenuItem>
            <MenuItem value={24}>1 Day</MenuItem>
            <MenuItem value={168}>1 Week</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button
            onClick={handleShareClick}
            color="primary"
            variant="contained"
          >
            Generate and Copy Link
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default DocumentTable;
