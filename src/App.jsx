import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./Dashbord";


function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
