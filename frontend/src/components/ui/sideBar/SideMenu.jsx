import { NavLink } from "react-router-dom";

export default function SideMenu({ links }) {
  return (
    <ul className="menu bg-base-100 w-56 rounded-2xl  ">
      {links.map((link, index) => (
        <li key={index} className="px-2 py-1 ">
          <NavLink to={link.path} className={"text-lg px-2 gap-4 rounded-2xl"}>
            {link.icon}
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
