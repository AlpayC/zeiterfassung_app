import { Link } from "react-router-dom";
import UserDropDown from "./UserDropDown";

export default function LoggedInArea({
  user,
  logout,
  navLinks,
  dropDownLinks,
}) {
  return (
    <>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <UserDropDown user={user} logout={logout} links={dropDownLinks} />
      </div>
    </>
  );
}
