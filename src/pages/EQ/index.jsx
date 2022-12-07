import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";

import Map from "../../components/Map/index.jsx";
import NavBar from "../../components/NavBar/index.jsx";

import platesGeoJSON from "./plates.geojson";
import eqDataGeJson from "./data.geojson";

const EQ = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [plates, setPlates] = useState(null);
  const [eq, setEq] = useState(null);

  const style = { radius: 200000, color: "red" };

  const loadEqData = async () => {
    if (eq) {
      eq.remove();
      setEq(null);
    } else {
      const response = await fetch(eqDataGeJson);
      const data = await response.json();
      const eqLayer = L.geoJson(data, { style: style }).addTo(map);
      setEq(eqLayer);
    }
  };

  const loadPlates = async () => {
    if (plates) {
      plates.remove();
      setPlates(null);
    } else {
      const response = await fetch(platesGeoJSON);
      const data = await response.json();
      const platesLayer = L.geoJson(data).addTo(map);
      setPlates(platesLayer);
    }
  };

  useEffect(() => {
    if (map) {
      map.setZoom(1);
    }
  }, [map]);

  return (
    <div className="container">
      <NavBar />
      <Map mapRef={mapRef} setMap={setMap} />
      <div className="container__actions">
        <button className="container__actions__button" onClick={loadPlates}>
          Add Plates
        </button>
        <button className="container__actions__button" onClick={loadEqData}>
          Add Points
        </button>
      </div>
    </div>
  );
};

export default EQ;
