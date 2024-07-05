import React from "react";
import Routing from "./Routing";
import { setAuthorizationHeader } from "./api";

function App() {
  setAuthorizationHeader(localStorage.getItem("token"));
  return (
    <div>
      <Routing />
    </div>
  );
}

export default App;
