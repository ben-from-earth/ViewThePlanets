import { createSlice } from "@reduxjs/toolkit";
import { Atmosphere, Body, HelioVector } from "astronomy-engine";
import { imageURLs, planetSavedData } from "../utils/planetarySavedData";

const initialState = {
  planetData: [],
  scale: 0,
  pixelHeight: 0,
  solarDivHeight: 0,
  // add Date to the state so we can get info from that information throughtout the app maybe we add date to local storage to persist
};

export const solarSlice = createSlice({
  name: "solar",
  initialState,
  reducers: {
    getPlanetData: (state) => {
      const date = new Date(localStorage.getItem("ViewThePlanetsDate"));
      const planets = [
        Body.Mercury,
        Body.Venus,
        Body.Earth,
        Body.Mars,
        Body.Jupiter,
        Body.Saturn,
        Body.Uranus,
        Body.Neptune,
      ];

      // Collect positions around the Sun
      const data = planets.map((p) => {
        const vec = HelioVector(p, date);
        const xyRadius = Math.sqrt(vec.x ** 2 + vec.y ** 2);
        const distanceFromSun = Math.sqrt(vec.x ** 2 + vec.y ** 2 + vec.z ** 2);
        return {
          name: p,
          x: vec.x,
          y: vec.y,
          z: vec.z,
          xyRadius,
          distanceFromSun,
          imageURL: imageURLs.find((planet) => planet.name === p).URL,
          description: planetSavedData.find((planet) => planet.name === p)
            .description,
          summary: planetSavedData.find((planet) => planet.name === p).summary,
          diameter: planetSavedData.find((planet) => planet.name === p)
            .diameter,
          atmosphereComp: planetSavedData.find((planet) => planet.name === p)
            .atmosphereComp,
          numMoons: planetSavedData.find((planet) => planet.name === p)
            .numMoons,
        }; // all distance and position data in AU
      });
      state.planetData = data;

      //Calculation for scale so that orbit of Neptune always view width with padding of 5 pixels on each side.
      const viewWidth = document.documentElement.clientWidth; //view width excluding scroll bar for clean display
      const { xyRadius: neptuneRadius } = state.planetData.find(
        (p) => p.name === "Neptune"
      );
      state.scale = Math.floor((viewWidth - 10) / (neptuneRadius * 2));
      state.pixelHeight = neptuneRadius * state.scale;
      state.solarDivHeight = Math.ceil(neptuneRadius * 2 * state.scale + 10);
    },
  },
});

export const { getPlanetData } = solarSlice.actions;
export default solarSlice.reducer;
