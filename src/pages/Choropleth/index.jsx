import React, { useRef, useState, useEffect } from "react";
import L from "leaflet";

import Map from "../../components/Map";
import NavBar from "../../components/NavBar";

import geoJSONData from "./data.geojson";

const ChoroPleth = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [selected, setSelected] = useState(null);
  const geoJsonRef = useRef(null);
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
      fillOpacity: 0.8,
    };
  };

  const handleHover = (e) => {
    const layer = e.target;

    const { name, gdp_md } = layer.feature.properties;

    setSelected({ name, gdp_md });

    layer.setStyle({
      color: "#fff",
    });
    layer.bringToFront();
  };

  const handleOut = (e) => {
    geoJsonRef.current.resetStyle(e.target);
  };

  const onEachFeature = (_, layer) => {
    layer.on({
      mouseover: handleHover,
      mouseout: handleOut,
    });
  };

  const loadGeoJSON = async () => {
    const response = await fetch(geoJSONData);
    const data = await response.json();
    const gdpsTemp = data.features.map((feature) => feature.properties.gdp_md);
    gdps.current = gdpsTemp;
    map.setView([-20.47, -58.23], 3);
    geoJsonRef.current = L.geoJson(data, {
      style: setStyle,
      onEachFeature,
    }).addTo(map);
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
        <div className="container__actions">
          {selected && (
            <>
              <p>{selected.name && selected.name}</p>
              <p>
                {selected.gdp_md &&
                  `${(selected.gdp_md / 1000).toFixed(2)} Billion USD`}
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ChoroPleth;
