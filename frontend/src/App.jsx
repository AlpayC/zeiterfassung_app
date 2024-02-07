import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import UserAuth from "./pages/UserAuth";
import Profile from "./pages/Profile";
import Tracker from "./pages/Tracker";
import BigCalendar from "./pages/BigCalendar";
import Messages from "./pages/Messages";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./user/ResetPassword";
import LayoutContainer from "./components/LayoutContainer";
import { UserContext } from "./user/UserContext";
import { useContext, useEffect, useState } from "react";
import Projects from "./pages/Projects";

function App() {
  const { isLoggedIn } = useContext(UserContext);

  const [online, setOnline] = useState(isLoggedIn);
  useEffect(() => {
    setOnline(isLoggedIn);
    const handleBeforeUnload = () => {
      localStorage.setItem("lastVisitedPage", window.location.pathname);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isLoggedIn, online]);

  return (
    <LayoutContainer>
      <Routes>
        <>
          <Route
            exact
            path="/dashboard"
            element={
              online ? (
                <Dashboard />
              ) : (
                <>
                  <Navigate to={"/login"} />
                  <UserAuth />
                </>
              )
            }
          />
          <Route
            path="/profile"
            element={
              online ? (
                <Profile />
              ) : (
                <>
                  <Navigate to={"/login"} />
                  <UserAuth />
                </>
              )
            }
          />
          <Route
            path="/tracker"
            element={
              online ? (
                <Tracker />
              ) : (
                <>
                  <Navigate to={"/login"} />
                  <UserAuth />
                </>
              )
            }
          />
          <Route
            path="/projects"
            element={
              online ? (
                <Projects />
              ) : (
                <>
                  <Navigate to={"/login"} />
                  <UserAuth />
                </>
              )
            }
          />
          <Route
            path="/calendar"
            element={
              online ? (
                <BigCalendar />
              ) : (
                <>
                  <Navigate to={"/login"} />
                  <UserAuth />
                </>
              )
            }
          />
          <Route
            path="/messages"
            element={
              online ? (
                <Messages />
              ) : (
                <>
                  <Navigate to={"/login"} />
                  <UserAuth />
                </>
              )
            }
          />

          <Route
            path="/"
            element={
              online ? (
                <>
                  <Navigate to={"/dashboard"} />
                  <Dashboard />
                </>
              ) : (
                <>
                  <Navigate to={"/"} />
                  <Home />
                </>
              )
            }
          />
          <Route
            path="/signup"
            element={
              online ? (
                <Navigate to={"/dashboard"} />
              ) : (
                <>
                  <Navigate to={"/signup"} />
                  <UserAuth />
                </>
              )
            }
          />
          <Route
            path="/login"
            element={
              online ? (
                <>
                  <Navigate to={localStorage.getItem("lastVisitedPage")} />
                </>
              ) : (
                <>
                  <Navigate to={"/login"} />
                  <UserAuth />
                </>
              )
            }
          />
          <Route
            path="/passwordReset"
            element={
              online ? (
                <Navigate to={"/dashboard"} />
              ) : (
                <>
                  <Navigate to={"/passwordReset"} />
                  <ResetPassword />
                </>
              )
            }
          />
        </>
      </Routes>
    </LayoutContainer>
  );
}

export default App;
