import "./SolarSystem.css";
import Planet from "../components/Planet";
import { useDispatch, useSelector } from "react-redux";
import DateInputForm from "../components/DateInputForm";
import { getPlanetData } from "../redux/solarSlice";

const SolarSystem = () => {
  const planetData = useSelector((state) => state.solar.planetData);
  const solarDivHeight = useSelector((state) => state.solar.solarDivHeight);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const { year, month, day } = values;
    const date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    localStorage.setItem("ViewThePlanetsDate", date.toISOString());
    dispatch(getPlanetData());
  };

  const date = new Date(localStorage.getItem("ViewThePlanetsDate"));

  return (
    <div className="SolarSystem" style={{ height: `${solarDivHeight}px` }}>
      {date ? (
        <p>
          Planetary Display for{" "}
          {date.toLocaleString("default", {
            month: "long",
          })}{" "}
          {date.getUTCDate()}, {Math.abs(date.getUTCFullYear())}{" "}
          {date.getUTCFullYear() < 0 ? "BC" : ""}
        </p>
      ) : (
        <p>Displayed date: </p>
      )}
      <DateInputForm handleSubmit={handleSubmit} />
      <Planet name={"Sun"} x={0} y={0} key={"Sun"} />
      {planetData.map((p) => (
        <Planet
          name={p.name}
          x={p.x}
          y={p.y}
          key={p.name}
          xyRadius={p.xyRadius}
        />
      ))}
    </div>
  );
};

export default SolarSystem;
