import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./user/Signup";
import Login from "./user/Login";
import Profile from "./pages/Profile";
import Tracker from "./pages/Tracker";
import "./App.css";
import ResetPassword from "./user/ResetPassword";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
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
