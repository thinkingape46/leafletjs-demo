import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";

import Map from "../../components/Map/index.jsx";
import NavBar from "../../components/NavBar/index.jsx";

const FindCoordinate = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [latLong, setLatLong] = useState("");

  const calcCoordinates = (e) => {
    console.log(e);
    const {
      latlng: { lat, lng },
    } = e;
    setLatLong(`Latitude: ${lat.toFixed(2)}, Longitdue: ${lng.toFixed(2)}`);
  };

  useEffect(() => {
    if (map) {
      map.addEventListener("click", calcCoordinates);
      return () => map.removeEventListener("click", calcCoordinates);
    }
  }, [map]);

  return (
    <div className="container">
      <NavBar />
      <Map mapRef={mapRef} setMap={setMap} />
      <div className="container__actions">
        <p>Selected Coordinates</p>
        <p>{latLong}</p>
      </div>
    </div>
  );
};

export default FindCoordinate;
