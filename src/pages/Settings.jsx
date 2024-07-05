import React from "react";
import { Container, Typography } from "@mui/material";
import Header from "../components/Header";

const Settings = () => {
  return (
    <div>
      <Header />
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>
        {/* Add settings form or content here */}
      </Container>
    </div>
  );
};

export default Settings;
