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
              <a href={link.path}>{link.label}</a>
            </li>
          ))}
        </ul>
        <UserDropDown user={user} logout={logout} links={dropDownLinks} />
      </div>
    </>
  );
}
