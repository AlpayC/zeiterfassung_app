import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "./user/UserContext";

// Routes
import Home from "./pages/Home";
import Signup from "./user/Signup";
import Login from "./user/Login";
import Profile from "./pages/Profile";
import Tracker from "./pages/Tracker";

import "./App.css";
import ResetPassword from "./user/ResetPassword";

function App() {
  const { isLoggedIn, logout } = useContext(UserContext);

  return (
    <>
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
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/passwordReset" element={<ResetPassword />} />
          <Route path="/tracker" element={<Tracker />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
