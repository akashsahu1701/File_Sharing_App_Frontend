import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { baseUrl } from "../api";
import { useLocation } from "react-router-dom";
import { deleteFile, getUsersListWithAccess } from "../api/files";
import FileAccessTable from "../components/AccessTable";

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

const FileViewPage = () => {
  const location = useLocation();
  const file = location.state?.file;
  const userId = localStorage.getItem("user_id");
  // const [selectedFiles, setSelectedFiles] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [startTime, setStartTime] = useState("");
  // const [endTime, setEndTime] = useState("");
  // const [trimMode, setTrimMode] = useState(false);

  // const handleOpenModal = (file, mode = "merge") => {
  //   if (mode === "trim") {
  //     setTrimMode(true);
  //     setSelectedFiles([file]);
  //   } else {
  //     setTrimMode(false);
  //     setSelectedFiles([]);
  //   }
  //   setModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setModalOpen(false);
  //   setSelectedFiles([]);
  //   setStartTime("");
  //   setEndTime("");
  //   setTrimMode(false);
  // };

  // const handleFileChange = (e) => {
  //   setSelectedFiles(Array.from(e.target.files));
  // };

  const deleteFiles = async () => {
    try {
      deleteFile(file.id)
        .then((res) => {
          if (res.code === 200) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  // const handleMerge = async () => {
  //   const formData = new FormData();
  //   selectedFiles.forEach((file, index) => {
  //     formData.append(`file${index}`, file);
  //   });

  //   try {
  //     const response = await axios.post(`${baseUrl}/merge`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     console.log("Files merged successfully:", response.data);
  //     handleCloseModal();
  //   } catch (error) {
  //     console.error("Error merging files:", error);
  //   }
  // };

  // const handleTrim = async () => {
  //   if (!startTime || !endTime) {
  //     alert("Please set both start and end times for trimming.");
  //     return;
  //   }
  //   try {
  //     const response = await axios.post(`${baseUrl}/trim`, {
  //       fileId: selectedFiles[0].id,
  //       startTime,
  //       endTime,
  //     });
  //     console.log("File trimmed successfully:", response.data);
  //     handleCloseModal();
  //   } catch (error) {
  //     console.error("Error trimming file:", error);
  //   }
  // };

  useEffect(() => {
    document.title = `${file.name}`;
    getUsersListWithAccess(file.id)
      .then((res) => {
        setUsers(res.data);
        setCurrentUser(
          res.data.find((user) => parseInt(user.id) === parseInt(userId))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [file, userId]);

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
        {/* {currentUser?.can_edit && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal(null)}
          >
            Merge Videos
          </Button>
        )} */}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} key={file.id}>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" component="div">
                {file.name}
              </Typography>
              <video
                style={{ alignSelf: "center" }}
                width="60%"
                height="60%"
                controls
              >
                <source src={`${baseUrl}/files/${file.id}`} type={file.type} />
                Your browser does not support the video tag.
              </video>
            </CardContent>
            {currentUser?.can_edit && (
              <CardActions>
                {/* <Button
                  size="small"
                  onClick={() => handleOpenModal(file, "trim")}
                >
                  Trim
                </Button> */}
                <Button size="small" onClick={() => deleteFiles()}>
                  Delete
                </Button>
              </CardActions>
            )}
          </Card>
        </Grid>
      </Grid>
      {currentUser?.can_edit && (
        <FileAccessTable users={users} setUsers={setUsers} fileId={file.id} />
      )}
      {/* <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="trim-video-modal-title"
        aria-describedby="trim-video-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="trim-video-modal-title" variant="h6" component="h2">
            {trimMode ? "Trim Video" : "Merge Videos"}
          </Typography>
          {trimMode ? (
            <>
              <TextField
                label="Start Time (in seconds)"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                sx={{ mb: 2, width: "100%" }}
              />
              <TextField
                label="End Time (in seconds)"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                sx={{ mb: 2, width: "100%" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleTrim}
                sx={{ mb: 2, width: "100%" }}
              >
                Trim Video
              </Button>
            </>
          ) : (
            <>
              <input
                type="file"
                multiple
                accept="video/*"
                onChange={handleFileChange}
                style={{ marginBottom: "16px" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleMerge}
                sx={{ mb: 2, width: "100%" }}
              >
                Merge Selected Videos
              </Button>
            </>
          )}
        </Box>
      </Modal> */}
    </Box>
  );
};

export default FileViewPage;
