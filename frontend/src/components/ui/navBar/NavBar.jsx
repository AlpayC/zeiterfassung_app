import { useContext } from "react";
import { UserContext } from "../../../user/UserContext";
import LoggedInArea from "./LoggedInArea";
import NotLoggedInArea from "./NotLoggedInArea";
import Logo from "../logo/Logo";
import Searchbar from "./Searchbar";
export default function NavBar() {
  const { isLoggedIn, logout, user } = useContext(UserContext);
  const notLoggedInLinks = [
    { label: "Login", path: "/login" },
    { label: "Signup", path: "/signup" },
  ];
  const loggedInLinks = [{ label: "Zeiterfassung", path: "/tracker" }];
  const userDropDownLinks = [
    { label: "Profil", path: "/profile", badge: "New" },
    { label: "Einstellungen", path: "/settings" },
    { label: "Logout", onClick: logout },
  ];
  return (
    <>
      <nav className="navbar bg-base-100 ">
        {isLoggedIn ? <Searchbar /> : <Logo />}

        {!isLoggedIn && <NotLoggedInArea navLinks={notLoggedInLinks} />}
        {isLoggedIn && (
          <LoggedInArea
            dropDownLinks={userDropDownLinks}
            user={user}
            logout={logout}
            navLinks={loggedInLinks}
          />
        )}
      </nav>
    </>
  );
}
