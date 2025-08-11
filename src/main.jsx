import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { getPlanetData } from "./redux/solarSlice.js";

if (!localStorage.getItem("ViewThePlanetsDate")) {
  localStorage.setItem("ViewThePlanetsDate", new Date().toISOString());
}
store.dispatch(getPlanetData());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
