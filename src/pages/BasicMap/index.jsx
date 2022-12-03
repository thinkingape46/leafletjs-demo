import React, { useState, useRef } from "react";

import Map from "../../components/Map/index.jsx";
import NavBar from "../../components/NavBar/index.jsx";

import "./index.scss";

const BasicMap = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [lat, setLat] = useState(51.5);
  const [long, setLong] = useState(0);
  const [zoom, setZoom] = useState(5);

  const setView = () => {
    if (map) {
      map.setView([lat, long], zoom);
    }
  };

  return (
    <div className="container">
      <NavBar />
      <Map mapRef={mapRef} setMap={setMap} />
      <div className="container__actions">
        <label>Latitude: {lat}</label>
        <input
          placeholder="latitude"
          value={lat}
          min={-90}
          max={90}
          step={0.5}
          type="range"
          onChange={(e) => {
            setLat(e.target.value);
            setView();
          }}
        />
        <label>Longitude: {long}</label>
        <input
          placeholder="longitude"
          value={long}
          min={-180}
          max={180}
          step={0.5}
          type="range"
          onChange={(e) => {
            setLong(e.target.value);
            setView();
          }}
        />
        <label>Zoom: {zoom}</label>
        <input
          placeholder="zoom"
          value={zoom}
          type="range"
          min={1}
          max={18}
          onChange={(e) => {
            setZoom(e.target.value);
            setView();
          }}
        />
        <button className="container__actions__button" onClick={setView}>
          Set View
        </button>
      </div>
    </div>
  );
};

export default BasicMap;
