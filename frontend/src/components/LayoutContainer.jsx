import { useContext } from "react";
import NavBar from "../components/ui/navBar/NavBar";
import { UserContext } from "../user/UserContext";
import SideBar from "./ui/sideBar/sideBar";

const LayoutContainer = ({ children }) => {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <>
      {isLoggedIn ? (
        <div className="layout-container">
          <NavBar />
          <SideBar />
          <div className="content-container grid">{children}</div>
        </div>
      ) : (
        <>
          <NavBar />
          <div className="content-container grid">{children}</div>
        </>
      )}
    </>
  );
};

export default LayoutContainer;
