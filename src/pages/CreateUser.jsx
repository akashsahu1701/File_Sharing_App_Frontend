import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";
import Header from "../components/Header";
import { createUser } from "../api/users";

const roles = [
  { id: 1, role: "Super Admin" },
  { id: 2, role: "Admin" },
  { id: 3, role: "User" },
];
const CreateUser = () => {
  const role = localStorage.getItem("role");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRoles, setSelectedRoles] = useState("");
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCreateUser = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !selectedRoles) {
      setError("Please fill all the fields");
      return;
    }

    const data = {
      email: email,
      password: password,
      username: username,
      role_id: selectedRoles,
      user_ids: [],
    };
    createUser(data)
      .then((res) => {
        setEmail("");
        setPassword("");
        setUsername("");
        setSelectedRoles("");
        setError("");
        setSnackbarMessage("User created successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      })
      .catch((err) => {
        setError(err?.data?.error);
        setSnackbarMessage("User creation failed: " + err?.data?.error);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        console.log("User Creation Failed:", err);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Create User
            </Typography>
            <form onSubmit={handleCreateUser}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    required
                    fullWidth
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError("");
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    required
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    required
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                      labelId="role-label"
                      value={selectedRoles}
                      required
                      onChange={(e) => {
                        setSelectedRoles(e.target.value);
                        setError("");
                      }}
                      label="Role"
                    >
                      {role === "super-admin" ? (
                        roles.map((role) => (
                          <MenuItem key={role.id} value={role.id}>
                            {role.role}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value={3}>User</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </form>

            {error && <Typography color="error">{error}</Typography>}
            {}
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCreateUser}
            >
              Create User
            </Button>
          </CardActions>
        </Card>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateUser;
