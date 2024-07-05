import React from "react";
import { Container, Typography } from "@mui/material";
import Header from "../components/Header";

const CreateUser = () => {
  return (
    <div>
      <Header />
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Create User
        </Typography>
        {/* Add create user form or content here */}
      </Container>
    </div>
  );
};

export default CreateUser;
