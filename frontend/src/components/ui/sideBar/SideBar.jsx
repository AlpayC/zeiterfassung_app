import { useContext } from "react";
import { UserContext } from "../../../user/UserContext";
import Logo from "../logo/Logo";
import SideMenu from "./SideMenu";
import SideMenuProjects from "./SideMenuProjects";
import {
  TbHome,
  TbClockCheck,
  TbCalendar,
  TbMessage,
  TbMan,
  TbTableExport,
} from "react-icons/tb";
import AddButton from "./AddButton";
import { AlertContext } from "../../../context/AlertContext";
import { ProjectsContext } from "../../../context/ProjectContext";

export default function SideBar() {
  const { isLoggedIn, user } = useContext(UserContext);
  const { showAlert } = useContext(AlertContext);
  const { projects } = useContext(ProjectsContext);
  const sideMenuLinksGeneral = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <TbHome className="text-2xl" />,
    },
    {
      label: "Profil",
      path: "/profile",
      icon: <TbMan className="text-2xl" />,
    },
    {
      label: "Zeiterfassung",
      path: "/tracker",
      icon: <TbClockCheck className="text-2xl" />,
    },
    {
      label: "Kalender",
      path: "/calendar",
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

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       const response = await axios.get(`/api/projectmanagement/getProjects`, {
  //         params: {
  //           email: user.email,
  //         },
  //       });
  //       setProjects(response.data);
  //       console.log(projects);
  //     } catch (e) {
  //       showAlert(
  //         `${e.response?.data.message}`,
  //         ` ${e.response?.data.error.message}`,
  //         "alert-error",
  //         4000
  //       );
  //       console.log(e);
  //     }
  //   };
  //   fetchProjects();
  // }, []);
  return (
    <>
      {isLoggedIn && (
        <div className="h-screen w-max px-6 bg-base-300 sidebar py-5 ">
          <Logo />
          <SideMenu links={sideMenuLinksGeneral} />

          <AddButton label={"Meine Projekte"} type={"projects"} />
          {projects && <SideMenuProjects links={projects} />}
          <AddButton label={"Meine Workspaces"} />
        </div>
      )}
    </>
  );
}
