import { useContext } from "react";

import { UserContext } from "../user/UserContext";
export default function NavBar() {
  const { isLoggedIn, logout } = useContext(UserContext);

  return (
    <nav>
      <a href="/">Home</a>
      {!isLoggedIn && (
        <>
          <a href="/signup">Signup</a>
          <a href="/login">Login</a>
        </>
      )}
      {isLoggedIn && (
        <>
          <a href="/profile">Profil</a>
          <a href="/tracker">Zeiterfassung</a>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
}
