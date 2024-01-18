import { NavLink } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

export default function BackButton({ label, link }) {
  return (
    <NavLink to={link} className={"flex items-center"}>
      <TiArrowBack className="text-8xl text-red-600" />
      <p className="font-semibold"> {label}</p>
    </NavLink>
  );
}
