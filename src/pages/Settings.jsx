import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Modal,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
} from "@mui/material";
import { fetchUsers, updateSettings } from "../api/users";
import { setAuthorizationHeader } from "../api";

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

const SettingsPage = () => {
  const userRole = localStorage.getItem("role");
  const userId = localStorage.getItem("user_id");
  const [tabIndex, setTabIndex] = useState(0);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userValues, setUsersValues] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [fileSizeLimit, setFileSizeLimit] = useState("");
  const [totalSizeLimit, setTotalSizeLimit] = useState("");

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const fetchUsersData = async () => {
    fetchUsers()
      .then((res) => {
        setUsers(res.data);
        console.log(":::::::::::", userId);
        let normalUsers = res.data.filter((user) => user.role === "user");
        setUsersValues(normalUsers);
        let user = res.data.find(
          (user) => parseInt(user.id) === parseInt(userId)
        );

        setFileSizeLimit(user?.file_size_limit);
        setTotalSizeLimit(user?.total_size_limits);
        setCurrentUser(user);
        console.log(normalUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  useEffect(() => {
    document.title = "Settings";
    fetchUsersData();
    // eslint-disable-next-line
  }, []);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setSelectedUsers(user.manage_users || []);
    setFileSizeLimit(user.file_size_limit);
    setTotalSizeLimit(user.total_size_limits);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
    setFileSizeLimit(currentUser.file_size_limit);
    setTotalSizeLimit(currentUser.total_size_limits);
    setSelectedUsers([]);
  };

  const handleSelectUser = (event) => {
    setSelectedUsers(event.target.value);
  };

  const handleSave = async () => {
    try {
      const data = {
        user_id: selectedUser.id,
        total_size_limits: parseInt(totalSizeLimit),
        file_size_limit: parseInt(fileSizeLimit),
      };
      if (selectedUsers.length !== 0) {
        let ids = new Set([...selectedUsers, selectedUser.id]);
        ids = Array.from(ids);
        data["manage_users"] = ids;
      }
      updateSettings(data)
        .then((res) => {
          console.log(res.data);
          fetchUsersData();
          handleCloseModal();
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography
          variant="h6"
          component="div"
          onClick={() => window.history.back()}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <img
            src="https://img.icons8.com/?size=100&id=40217&format=png&color=000000"
            height={25}
            alt="back"
          />
        </Typography>
      </Box>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Profile" />
        <Tab label="Manage Users" />
      </Tabs>
      {tabIndex === 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Profile</Typography>
          <TextField
            label="File Size Limit"
            fullWidth
            disabled
            sx={{ mt: 2 }}
            value={fileSizeLimit}
            onChange={(e) => !isNaN && setFileSizeLimit(e.target.value)}
          />
          <TextField
            label="Total Size Limit"
            fullWidth
            disabled
            sx={{ mt: 2 }}
            value={totalSizeLimit}
            onChange={(e) => !isNaN && setTotalSizeLimit(e.target.value)}
          />
          <Button
            onClick={() => {
              localStorage.clear();
              setAuthorizationHeader();
              window.location.href = "/login";
            }}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Log Out
          </Button>
        </Box>
      )}
      {tabIndex === 1 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Manage Users</Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {users.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {user.username}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Email: {user.email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      File Size Limit: {user.file_size_limit}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Total Size Limit: {user.total_size_limits}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleOpenModal(user)}>
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="edit-user-modal-title"
        aria-describedby="edit-user-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="edit-user-modal-title" variant="h6" component="h2">
            Edit User
          </Typography>
          <TextField
            label="File Size Limit"
            value={fileSizeLimit}
            onChange={(e) =>
              !isNaN(e.target.value) && setFileSizeLimit(e.target.value)
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Total Size Limit"
            value={totalSizeLimit}
            onChange={(e) =>
              !isNaN(e.target.value) && setTotalSizeLimit(e.target.value)
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          {userRole === "super-admin" && selectedUser?.role === "admin" && (
            <Select
              labelId="multi-select-users-label"
              multiple
              value={selectedUsers}
              onChange={handleSelectUser}
              input={<OutlinedInput label="Select Users" />}
              sx={{ mb: 2, width: "100%" }}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => {
                    if (selectedUser?.id === value) {
                      return <></>;
                    } else {
                      return (
                        <>
                          <Chip
                            key={value}
                            label={
                              users.find((user) => user.id === value).username
                            }
                          />
                        </>
                      );
                    }
                  })}
                </Box>
              )}
            >
              {userValues.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ mb: 2, width: "100%" }}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default SettingsPage;
