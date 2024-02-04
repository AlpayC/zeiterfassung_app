import { useContext } from "react";
import NavBar from "../components/ui/navBar/NavBar";
import { UserContext } from "../user/UserContext";
import SideBar from "./ui/sideBar/SideBar";
import Alert from "./ui/alerts/Alert";
const LayoutContainer = ({ children }) => {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <>
      {isLoggedIn ? (
        <div className="layout-container relative">
          <Alert />
          <NavBar />
          <SideBar />
          <div className="content-container grid relative">{children}</div>
        </div>
      ) : (
        <>
          <Alert />

          <NavBar />
          <div className="content-container grid">{children}</div>
        </>
      )}
    </>
  );
};

export default LayoutContainer;
