import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const FileCard = ({ file }) => {
  const navigation = useNavigate();
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="220"
        src={`https://img.icons8.com/?size=50&id=eB44N5tMd0OC&format=png&color=#f27d07`}
        alt="file"
      />
      <CardContent>
        <Typography
          gutterBottom
          sx={{
            fontWeight: "semibold",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            display: "-webkit-box",
            overflow: "hidden",
          }}
          variant="subtitle1"
          component="div"
        >
          {file.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {file.file_type} - {(file.size / 1024 / 1024).toFixed(2)} MB
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => navigation(`/view-files`, { state: { file } })}
          size="small"
        >
          View
        </Button>
        <Button size="small">Delete</Button>
        <Button size="small">Download</Button>
      </CardActions>
    </Card>
  );
};

export default FileCard;
