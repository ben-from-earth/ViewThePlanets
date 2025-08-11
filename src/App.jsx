import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import "./App.css";
import SolarSystem from "./pages/SolarSystem";
import RootLayout from "./layouts/RootLayout";
import { planetDetailsLoader } from "./loaders/planetDetailsLoader";
import PlanetDetails from "./pages/PlanetDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<SolarSystem />} />
      <Route
        path=":planet"
        element={<PlanetDetails />}
        loader={planetDetailsLoader}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
