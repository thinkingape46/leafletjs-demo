import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Counter from "./components/counter";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Counter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
