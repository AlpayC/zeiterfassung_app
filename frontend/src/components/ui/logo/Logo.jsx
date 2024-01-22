import { useContext } from "react";
import { UserContext } from "../../../user/UserContext";
import { Link } from "react-router-dom";

export default function Logo() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div className="flex-1">
      <Link
        className="btn btn-ghost text-xl"
        to={isLoggedIn ? "/dashboard" : "/"}
      >
        Timely
      </Link>
    </div>
  );
}
