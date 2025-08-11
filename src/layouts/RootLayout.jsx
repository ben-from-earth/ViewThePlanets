import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <header>
        <Navbar />
      </header>
      <Outlet />
    </div>
  );
};

export default RootLayout;
