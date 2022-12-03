import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";

import Map from "../../components/Map/index.jsx";
import NavBar from "../../components/NavBar/index.jsx";

const PolyLine = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    const locs = [];
    if (map) {
      let xhr = new XMLHttpRequest();

      function parseGpx(gpxResponse) {
        let domParser = new DOMParser();
        let gpxParsedDocument = domParser.parseFromString(
          gpxResponse,
          "text/xml"
        );
        let trackPoints = gpxParsedDocument.getElementsByTagName("trkpt");

        let i;
        for (i = 0; i < trackPoints.length; i++) {
          locs.push([
            +trackPoints[i].attributes[0].value,
            +trackPoints[i].attributes[1].value,
          ]);
        }
        setLocations(locs);
      }

      let gpxfileurl =
        "https://raw.githubusercontent.com/thinkingape46/gpx-chemin/master/app/assets/tracks/31.51_HR.gpx";

      xhr.open("GET", gpxfileurl);
      xhr.responsetype = XMLDocument;
      xhr.onload = function () {
        parseGpx(xhr.response);
      };
      xhr.send();

      map.setZoom(12);
    }
  }, [map]);

  useEffect(() => {
    if (locations && map) {
      let x = L.polyline(locations, { color: "red" }).addTo(map);
      map.setView([12.967172, 77.717316]);
    }
  }, [locations, map]);

  return (
    <div className="container">
      <NavBar />
      <Map mapRef={mapRef} setMap={setMap} />
      <div className="container__actions"></div>
    </div>
  );
};

export default PolyLine;
