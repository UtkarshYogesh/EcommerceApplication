import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./core/Home";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
