import { useContext } from "react";
import { UserContext } from "../../../user/UserContext";
import Logo from "../logo/Logo";
import SideMenu from "./SideMenu";
import {
  TbHome,
  TbClockCheck,
  TbCalendar,
  TbMessage,
  TbSchool,
  TbHeart,
  TbPlane,
  TbBriefcase,
  TbTableExport,
} from "react-icons/tb";
import AddButton from "./AddButton";

export default function SideBar() {
  const { isLoggedIn } = useContext(UserContext);
  const sideMenuLinksGeneral = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <TbHome className="text-2xl" />,
    },
    {
      label: "Zeiterfassung",
      path: "/tracker",
      icon: <TbClockCheck className="text-2xl" />,
    },
    {
      label: "Kalender",
      path: "/profile",
      icon: <TbCalendar className="text-2xl" />,
    },
    {
      label: "Projekte",
      path: "/projects",
      icon: <TbTableExport className="text-2xl  " />,
    },
    {
      label: "Nachrichten",
      path: "/messages",
      icon: <TbMessage className="text-2xl" />,
    },
  ];
  const sideMenuLinksTasks = [
    {
      label: "Inbox",
      path: "/tasks/inbox",
      icon: <TbHome className="text-2xl" />,
      color: "red",
    },
    {
      label: "Arbeit",
      path: "/tasks/work",
      icon: <TbBriefcase className="text-2xl" />,
      color: "blue",
    },
    {
      label: "Studium",
      path: "/tasks/study",
      icon: <TbSchool className="text-2xl" />,
      color: "yellow",
    },
    {
      label: "Gesundheit",
      path: "/tasks/health",
      icon: <TbHeart className="text-2xl" />,
      color: "green",
    },
    {
      label: "Reise",
      path: "/tasks/holiday",
      icon: <TbPlane className="text-2xl" />,
      color: "purple",
    },
  ];
  return (
    <>
      {isLoggedIn && (
        <div className="h-screen w-max px-6 bg-base-300 sidebar py-5 ">
          <Logo />
          <SideMenu links={sideMenuLinksGeneral} />
          <AddButton label={"Meine Listen"} />
          <SideMenu links={sideMenuLinksTasks} />
          <AddButton label={"Meine Workspaces"} />
        </div>
      )}
    </>
  );
}
