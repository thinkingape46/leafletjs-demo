import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";

import Map from "../../components/Map/index.jsx";
import NavBar from "../../components/NavBar/index.jsx";

const AddPlace = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [lat, setLat] = useState(51.5);
  const [long, setLong] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [name, setName] = useState("");
  const [markers, setMarkers] = useState([]);

  const calcCoordinates = (e) => {
    const {
      latlng: { lat: la, lng: ln },
    } = e;
    setLat(la);
    setLong(ln);
    setOpenForm(true);
  };

  const savePlace = (e) => {
    e.preventDefault();
    const place = { name: name, lat, long };
    const placesStored = localStorage.getItem("places");
    if (placesStored) {
      const newList = JSON.parse(placesStored).concat(place);
      localStorage.setItem("places", JSON.stringify(newList));
    } else {
      localStorage.setItem("places", JSON.stringify([place]));
    }
    setName("");
    setOpenForm(false);
  };

  useEffect(() => {
    if (map) {
      map.addEventListener("click", calcCoordinates);
      return () => map.removeEventListener("click", calcCoordinates);
    }
  }, [map]);

  useEffect(() => {
    const placesStored = localStorage.getItem("places");

    if (map && placesStored) {
      markers.forEach((m) => {
        m.remove();
      });
      const markerList = [];
      const pls = JSON.parse(placesStored);
      pls.forEach((p) => {
        const m = L.marker([p.lat, p.long]).addTo(map);
        m.bindPopup(p.name).openPopup();
        map.setView([p.lat, p.long], 10);
        markerList.push(m);
      });
      setMarkers(markerList);
    }
  }, [openForm, map]);

  return (
    <div className="container">
      <NavBar />
      <Map mapRef={mapRef} setMap={setMap} />
      <div className="container__actions">
        <p>Click on map to save a place</p>
        {openForm && (
          <form onSubmit={savePlace}>
            <label>Name</label>
            <input
              required
              value={name}
              type="text"
              className="container__actions__input"
              onChange={(e) => setName(e.target.value)}
            />
            <p>Latitude: {lat.toFixed(2)}</p>
            <p>Longitude: {long.toFixed(2)}</p>
            <button className="container__actions__button" type="submit">
              Save Place
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddPlace;
