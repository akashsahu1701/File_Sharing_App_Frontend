import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginForm from "./pages/Login";
import Homepage from "./pages/Homepage";
import CreateUser from "./pages/CreateUser";
import Settings from "./pages/Settings";
import FileViewPage from "./pages/ViewFiles";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/create-user" element={<CreateUser />} />
        <Route exact path="/view-files" element={<FileViewPage />} />
        <Route exact path="/settings" element={<Settings />} />
        <Route
          path="*"
          element={<div style={{ textAlign: "center" }}>404 NOT FOUND</div>}
        />
      </Routes>
    </Router>
  );
};

export default Routing;
