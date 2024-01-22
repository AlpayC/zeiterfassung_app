import { useContext } from "react";
import { UserContext } from "../../../user/UserContext";
import Logo from "../logo/Logo";
import SideMenu from "./SideMenu";
import { TbHome, TbClockCheck, TbCalendar } from "react-icons/tb";

export default function SideBar() {
  const { isLoggedIn } = useContext(UserContext);
  const sideMenuLinks = [
    { label: "Dashboard", path: "/dashboard", icon: <TbHome /> },
    { label: "Zeiterfassung", path: "/tracker", icon: <TbClockCheck /> },
    { label: "Kalender", path: "/profile", icon: <TbCalendar /> },
  ];
  return (
    <>
      {isLoggedIn && (
        <div className="h-screen w-max px-6 bg-base-300 sidebar py-5">
          <Logo />
          <SideMenu links={sideMenuLinks} />
        </div>
      )}
    </>
  );
}
