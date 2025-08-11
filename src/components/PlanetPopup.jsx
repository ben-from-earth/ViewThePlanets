import { useSelector } from "react-redux";

const PlanetPopup = ({ xCoord, yCoord, hovered, name }) => {
  const planetData = useSelector((state) =>
    state.solar.planetData.find((p) => p.name === name)
  );

  const screenWidth = document.documentElement.clientWidth;

  return (
    <div
      className={`PlanetPopup 
        ${screenWidth - xCoord < 100 ? "shiftLeft" : ""} 
        ${xCoord < 100 ? "shiftRight" : ""} ${yCoord < 100 ? "shiftDown" : ""}`}
      style={{
        left: xCoord,
        top: yCoord - 75,
        visibility: hovered ? "visible" : "hidden",
      }}
    >
      <img src={planetData.imageURL} style={{ height: "2.5rem" }} />
      <p>{planetData.name}</p>
      <p>
        <i>{planetData.description}</i>
      </p>
    </div>
  );
};

export default PlanetPopup;
