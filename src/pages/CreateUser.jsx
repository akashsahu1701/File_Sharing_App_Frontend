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
} from "@mui/material";
import Header from "../components/Header";
import { createUser } from "../api/users";

const roles = [
  { id: 1, role: "Super Admin" },
  { id: 2, role: "Admin" },
  { id: 3, role: "User" },
];
const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRoles, setSelectedRoles] = useState("");

  const handleCreateUser = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
      username: username,
      role_id: selectedRoles,
      user_ids: [],
    };
    createUser(data)
      .then((res) => {
        console.log("User Created:", res);
      })
      .catch((err) => {
        console.log("User Creation Failed:", err);
      });
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
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                      labelId="role-label"
                      value={selectedRoles}
                      onChange={(e) => setSelectedRoles(e.target.value)}
                      label="Role"
                    >
                      {roles.map((role) => (
                        <MenuItem key={role.id} value={role.id}>
                          {role.role}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </form>
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
    </div>
  );
};

export default CreateUser;
