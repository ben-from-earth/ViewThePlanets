import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import PlanetPopup from "./PlanetPopup";

const Planet = ({ name, x, y, xyRadius }) => {
  const scale = useSelector((state) => state.solar.scale);
  const heighOffset = useSelector((state) => state.solar.pixelHeight);
  const centerX = document.documentElement.clientWidth / 2;
  const centerY = heighOffset;
  const orbitRadius = Math.floor(xyRadius * scale);

  const xCoord = x * scale + centerX;
  const yCoord = y * scale + centerY;

  const [hovered, setHovered] = useState(false);

  return (
    <>
      {name !== "Sun" ? (
        <>
          <PlanetPopup
            hovered={hovered}
            name={name}
            xCoord={xCoord}
            yCoord={yCoord}
          />
          <NavLink
            to={name}
            className="PlanetLink"
            style={{ left: xCoord, top: yCoord }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="Planet" />
          </NavLink>
        </>
      ) : (
        <div className="Sun" style={{ left: xCoord, top: yCoord }}></div>
      )}

      {name !== "Sun" ? (
        <div
          className="Orbit"
          style={{
            width: orbitRadius * 2,
            height: orbitRadius * 2,
            left: centerX,
            top: centerY,
          }}
          key={orbitRadius}
        ></div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Planet;
