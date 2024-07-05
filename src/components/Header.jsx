import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { setAuthorizationHeader } from "../api";

const Header = () => {
  const role = localStorage.getItem("role");
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">
            File Management System
          </Button>
        </Typography>
        <Box sx={{ display: "flex" }}>
          {role === "user" ? (
            <Button
              color="inherit"
              onClick={() => {
                localStorage.clear();
                setAuthorizationHeader();
                window.location.reload();
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              {" "}
              <Button color="inherit" component={Link} to="/create-user">
                Create User
              </Button>
              <Button color="inherit" component={Link} to="/settings">
                Settings
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
