import { useContext } from "react";
import NavBar from "../components/ui/navBar/NavBar";
import { UserContext } from "../user/UserContext";
import SideBar from "./ui/sideBar/SideBar";
import Alert from "./ui/alerts/Alert";
import Footer from "./footer/Footer";

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
        <div className="relative ">
          <Alert />
          <NavBar />
          <div className="content-container grid gradient-background">
            {children}
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default LayoutContainer;
