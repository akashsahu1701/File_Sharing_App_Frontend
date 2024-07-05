import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import { gaveAccess } from "../api/files";

const FileAccessTable = ({ users, setUsers, fileId }) => {
  const handleCheckboxChange = (event, userId, permissionType) => {
    let data = {};
    data[`can_${permissionType}`] = event.target.checked;
    console.log(fileId, userId, data);
    gaveAccess(fileId, userId, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // Update the state of the user with the new checkbox value
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          ...data,
        };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="center">Can View</TableCell>
            <TableCell align="center">Can Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {user.username}
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={user.can_view}
                  onChange={(e) => handleCheckboxChange(e, user.id, "view")}
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={user.can_edit}
                  onChange={(e) => handleCheckboxChange(e, user.id, "edit")}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FileAccessTable;
