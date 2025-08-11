import { useSelector } from "react-redux";
import { NavLink } from "react-router";

const Navbar = () => {
  const planetData = useSelector((state) => state.solar.planetData);
  if (!planetData.length) return null;
  return (
    <div className="Navbar">
      <NavLink to="/">Home</NavLink>
      {planetData.map((p) => (
        <NavLink to={p.name} key={p.name}>
          {p.name}
        </NavLink>
      ))}
    </div>
  );
};

export default Navbar;
