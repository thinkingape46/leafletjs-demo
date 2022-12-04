import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";

import Map from "../../components/Map/index.jsx";
import NavBar from "../../components/NavBar/index.jsx";

import issSvg from "./International-Space-Station_mark.svg";

const SpaceStation = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [issMarkers, setIssMarkers] = useState([]);
  const [lat, setLat] = useState(51.5);
  const [long, setLong] = useState(0);
  const [intervalTimer, setIntervalTimer] = useState(null);
  const intervalTimerRef = useRef(null);
  const [issCoordsArray, setIssCoordsArray] = useState([]);
  const [isspath, setIsspath] = useState(null);
  const issMarker = useRef(null);

  const fetchIssLocation = async () => {
    const result = await fetch("http://api.open-notify.org/iss-now.json");
    const {
      iss_position: { latitude, longitude },
    } = await result.json();
    if (latitude && longitude) {
      return [latitude, longitude];
    }
  };

  const issLoc = async () => {
    if (issMarker.current) {
      issMarker.current.remove();
    }

    const loaction = await fetchIssLocation();

    var myIcon = L.icon({
      iconUrl: issSvg,
      iconSize: [40, 40],
    });

    issMarker.current = L.marker(loaction, {
      icon: myIcon,
    }).addTo(map);

    map.setView(loaction);
  };

  const moveIssMarker = async () => {
    const loaction = await fetchIssLocation();
    console.log(56, loaction);
    setIssCoordsArray((prev) => prev.concat([loaction]));
    issMarker.current.setLatLng(loaction);
  };

  const trackIssLocation = () => {
    intervalTimerRef.current = setInterval(moveIssMarker, 1000);
  };

  const showTraackingLine = () => {
    if (isspath) {
      isspath.remove();
    }
    console.log(68, issCoordsArray);
    const p = L.polyline(issCoordsArray, { color: "red" }).addTo(map);
    setIsspath(p);
  };

  const stopTracking = () => {
    if (issMarker.current) {
      issMarker.current.remove();
    }
    clearInterval(intervalTimerRef.current);
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalTimerRef.current);
    };
  }, []);

  return (
    <div className="container">
      <NavBar />
      <Map mapRef={mapRef} setMap={setMap} />
      <div className="container__actions">
        <button className="container__actions__button" onClick={issLoc}>
          Find ISS location
        </button>
        <button
          className="container__actions__button"
          onClick={trackIssLocation}
        >
          Track ISS location
        </button>
        <button className="container__actions__button" onClick={stopTracking}>
          Stop location
        </button>
        <button
          className="container__actions__button"
          onClick={showTraackingLine}
        >
          Show Path
        </button>
        <button
          className="container__actions__button"
          onClick={() => {
            if (isspath) {
              isspath.remove();
            }
          }}
        >
          Hide Path
        </button>
      </div>
    </div>
  );
};

export default SpaceStation;
