import { NavLink } from "react-router-dom";
import { getIconComponent } from "../../../utils/getIconComponent";

export default function SideMenuProjects({ links }) {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <ul className="menu bg-base-100 w-56 rounded-2xl ">
      {links.map((link, index) => {
        return (
          <li key={index} className="px-2 py-1">
            <NavLink
              to={`/projects/${link._id}/details`}
              className="text-lg px-2 gap-4 rounded-2xl"
            >
              {getIconComponent(link.icon)}
              {link.title}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}
