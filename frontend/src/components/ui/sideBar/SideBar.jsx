import { useContext } from "react";
import { UserContext } from "../../../user/UserContext";
import Logo from "../logo/Logo";
export default function SideBar() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      {isLoggedIn && (
        <div className="h-screen w-full bg-base-300 sidebar ">
          <Logo />
        </div>
      )}
    </>
  );
}
