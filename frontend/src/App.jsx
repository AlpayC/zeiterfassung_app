import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./user/Signup";
import Login from "./user/Login";
import Profile from "./pages/Profile";
import Tracker from "./pages/Tracker";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./user/ResetPassword";
import LayoutContainer from "./components/LayoutContainer";
import { UserContext } from "./user/UserContext";
import { useContext } from "react";

function App() {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <LayoutContainer>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tracker" element={<Tracker />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/passwordReset" element={<ResetPassword />} />
          </>
        )}
      </Routes>
    </LayoutContainer>
  );
}

export default App;
