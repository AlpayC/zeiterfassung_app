import { Link } from "react-router-dom";
import MenuBadge from "./MenuBadge";
import UserAvatar from "./UserAvatar";

export default function UserDropDown({ user, links }) {
  return (
    <div className="dropdown dropdown-end ">
      <UserAvatar user={user} />
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52"
      >
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.path} onClick={link.onClick}>
              {link.label}
              {link.badge && <MenuBadge label={link.badge} />}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
