import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./user/Signup";
import Login from "./user/Login";
import Profile from "./pages/Profile";
import Tracker from "./pages/Tracker";
import BigCalendar from "./pages/BigCalendar";
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
                  <Login />
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
                  <Login />
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
                  <Login />
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
                  <Login />
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
                  <Login />
                </>
              )
            }
          />

          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={
              online ? (
                <Navigate to={"/dashboard"} />
              ) : (
                <>
                  <Navigate to={"/signup"} />
                  <Signup />
                </>
              )
            }
          />
          <Route
            path="/login"
            element={
              online ? (
                <Navigate to={"/dashboard"} />
              ) : (
                <>
                  <Navigate to={"/login"} />
                  <Login />
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
