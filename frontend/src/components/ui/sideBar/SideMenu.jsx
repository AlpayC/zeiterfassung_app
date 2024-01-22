import { NavLink } from "react-router-dom";

export default function SideMenu({ links }) {
  return (
    <ul className="menu bg-base-200 w-56 rounded-box my-12">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink to={link.path}>
            {link.icon}
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
