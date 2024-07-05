import React, { useState } from "react";
import { Box, Button, Typography, Modal, LinearProgress } from "@mui/material";
import { uploadFile } from "../api/files";
// import { apiHandler } from "./api"; // Adjust the import path as needed

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UploadFileModal = ({ open, handleClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    setLoading(true);
    uploadFile(selectedFile)
      .then((res) => {
        setLoading(false);
        if (res.code === 201) {
          handleClose();
          window.location.reload();
        }
        setError("");
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="upload-file-modal-title"
      aria-describedby="upload-file-modal-description"
    >
      <Box sx={modalStyle}>
        <Button
          variant="contained"
          component="label"
          sx={{ mb: 2, width: "100%" }}
        >
          Select File
          <input
            type="file"
            accept="video/*"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {selectedFile && (
          <>
            <img
              style={{ width: "200px", height: "200px" }}
              src={`https://img.icons8.com/?size=100&id=eB44N5tMd0OC&format=png&color=000000`}
              alt={selectedFile.name}
            />
            <Typography variant="body1" sx={{ mb: 2 }}>
              Selected file: {selectedFile.name}
            </Typography>
          </>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          sx={{ mb: 2, width: "100%" }}
        >
          Upload
        </Button>
        {error && (
          <Typography variant="subtitle2" color={"error"}>
            {error}
          </Typography>
        )}
        {loading && <LinearProgress />}
      </Box>
    </Modal>
  );
};

export default UploadFileModal;
