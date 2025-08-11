import { useSelector } from "react-redux";
import { useLoaderData } from "react-router";
import { get3DDistance } from "../utils/get3DDistance";

const PlanetDetails = () => {
  const planetName = useLoaderData();
  const planetData = useSelector((state) => state.solar.planetData);
  const {
    x,
    y,
    z,
    distanceFromSun,
    imageURL,
    description,
    diameter,
    atmosphereComp,
    numMoons,
    summary,
  } = planetData.find((p) => p.name === planetName);
  const {
    x: earthX,
    y: earthY,
    z: earthZ,
  } = planetData.find((p) => p.name === "Earth");

  const distanceFromEarth = get3DDistance(x, y, z, earthX, earthY, earthZ);

  function getMilesString(AUdistance) {
    const milesPerAU = 92955807.3;
    const miles = AUdistance * milesPerAU;
    return miles;
  }

  function getKiloString(AUdistance) {
    const kmPerAU = 149597871;
    const kms = AUdistance * kmPerAU;
    return kms;
  }

  return (
    <div className="PlanetDetails">
      <img src={imageURL} />
      <div className="TitleBlock">
        <h1>{planetName}</h1>
        <h3>
          <i>{description}</i>
        </h3>
      </div>

      <div className="PlanetSummary">
        <h3>
          <i>Summary</i>
        </h3>
        <p>{summary}</p>
      </div>
      <div className="PlanetInfo">
        <h3>
          <i>Fun Facts:</i>
        </h3>
        <p>
          Diameter: {getMilesString(diameter).toFixed(2)} miles{" "}
          {`(${getKiloString(diameter).toFixed(2)} km)`}
        </p>
        <p>Atmospheric Composition: {atmosphereComp}</p>
        <p>Number of Moons: {numMoons}</p>
        <p>
          Distance from the Sun at Current Set Date:{" "}
          {(getMilesString(distanceFromSun) / 1000000).toFixed(2)} million miles{" "}
          {`(${(getKiloString(distanceFromSun) / 1000000).toFixed(
            2
          )} million km)`}
        </p>
        <p>
          Distance from Earth at Current Set Date:{" "}
          {(getMilesString(distanceFromEarth) / 1000000).toFixed(2)} million
          miles{" "}
          {`(${(getKiloString(distanceFromEarth) / 1000000).toFixed(
            2
          )} million km)`}
        </p>
      </div>
    </div>
  );
};

export default PlanetDetails;
