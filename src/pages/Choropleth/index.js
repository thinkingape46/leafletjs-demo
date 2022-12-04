import React, { useRef, useState, useEffect } from "react";
import L from "leaflet";

import Map from "../../components/Map";
import NavBar from "../../components/NavBar";

import geoJSONData from "./data.geojson";

const ChoroPleth = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const gdps = useRef(null);

  const setStyle = (feature) => {
    const featureGdp = feature.properties.gdp_md;
    const maxGdp = Math.max.apply(null, gdps.current);
    const fraction = 90 - Math.floor((featureGdp / maxGdp) * 60);
    return {
      fillColor: `hsl(360, 70%, ${fraction}%)`,
      color: `hsl(170, 78%, 10%)`,
      opacity: 1,
      strokeWidth: 1,
      fillOpacity: 0.9,
    };
  };

  const loadGeoJSON = async () => {
    const response = await fetch(geoJSONData);
    const data = await response.json();
    const gdpsTemp = data.features.map((feature) => feature.properties.gdp_md);
    gdps.current = gdpsTemp;
    map.setView([-20.47, -58.23], 3);
    L.geoJson(data, { style: setStyle }).addTo(map);
  };

  useEffect(() => {
    if (map) {
      loadGeoJSON();
    }
  }, [map]);

  return (
    <>
      <div className="container">
        <NavBar />
        <Map mapRef={mapRef} setMap={setMap} />
      </div>
    </>
  );
};

export default ChoroPleth;
