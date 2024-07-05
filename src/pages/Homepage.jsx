import React, { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

import Header from "../components/Header";
import FileCard from "../components/FileCards";
import { getMyFiles } from "../api/files";
import { setAuthorizationHeader } from "../api";
import UploadFileModal from "../components/UploadFiles";

const Homepage = () => {
  const [files, setFiles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    document.title = "Home";
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const token = localStorage.getItem("token");
    setAuthorizationHeader(token);
    if (!isAuthenticated) {
      window.location.href = "/login";
    }

    getMyFiles().then((res) => {
      setFiles(res.data);
    });
  }, []);

  return (
    <div>
      <Header />
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h6">Your Files</Typography>
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Upload File
          </Button>
        </Box>
        <Container>
          <Grid container spacing={1}>
            {files.map((file) => (
              <Grid item key={file.id} xs={12} sm={6} md={4}>
                <FileCard file={file} />
              </Grid>
            ))}
          </Grid>
        </Container>
        <UploadFileModal open={modalOpen} handleClose={handleCloseModal} />
      </Box>
    </div>
  );
};

export default Homepage;
