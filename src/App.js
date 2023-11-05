import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Album from "./pages/Album";
import Users from "./pages/users";

const Contact = () => {
  return <>Contact</>;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users />} />
      </Routes>
    </Router>
  );
};

export default App;
