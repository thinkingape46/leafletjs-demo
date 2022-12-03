import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BasicMap from "./pages/BasicMap/index.jsx";
import Marker from "./pages/Marker/index.jsx";
import FindCoordinate from "./pages/FindCoordinate/index.jsx";
import AddPlace from "./pages/AddPlace/index.jsx";
import SpaceStation from "./pages/SpaceStation/index.jsx";
import EQ from "./pages/EQ/index.jsx";
import SpeciesData from "./pages/SpeciesData/index.jsx";
import PolyLine from "./pages/PolyLine/index.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BasicMap />} />
        <Route path="/marker" element={<Marker />} />
        <Route path="/find-coordinate" element={<FindCoordinate />} />
        <Route path="/add-place" element={<AddPlace />} />
        <Route path="/space-station" element={<SpaceStation />} />
        <Route path="/eq" element={<EQ />} />
        <Route path="/species" element={<SpeciesData />} />
        <Route path="/polyline" element={<PolyLine />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
