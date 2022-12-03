import React, { useEffect } from "react";
import L from "leaflet";

import "./index.scss";

const Map = ({ setMap, mapRef }) => {
  useEffect(() => {
    if (mapRef.current) {
      const m = L.map(mapRef.current).setView([51.505, -0.09], 5);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(m);
      setMap(m);
    }
  }, []);

  return <div ref={mapRef} id="map"></div>;
};

export default Map;
