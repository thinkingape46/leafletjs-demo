import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./index.scss";

const links = [
  {
    href: "/",
    label: "Basic Map",
  },
  {
    href: "/marker",
    label: "Marker",
  },
  {
    href: "/find-coordinate",
    label: "Find Coordinate",
  },
  {
    href: "/add-place",
    label: "Add Place",
  },
  {
    href: "/space-station",
    label: "ISS",
  },
  {
    href: "/eq",
    label: "Earth Quakes",
  },
  {
    href: "/species",
    label: "Species Data",
  },
  {
    href: "/polyline",
    label: "Polyline",
  },
  {
    href: "/choropleth",
    label: "Choropleth",
  },
];

const NavBar = () => {
  const { pathname } = useLocation();
  return (
    <>
      <div className="navigation">
        {links.map((l, index) => (
          <Link
            to={l.href}
            key={index}
            className={`navigation__link ${
              pathname === l.href ? "navigation__link--active" : ""
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </>
  );
};

export default NavBar;
