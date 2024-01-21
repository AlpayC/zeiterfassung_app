import { NavLink } from "react-router-dom";

export default function NotLoggedInArea({ navLinks }) {
  return (
    <>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink to={link.path}>{link.label}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
