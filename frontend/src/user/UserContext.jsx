import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AlertContext } from "../context/AlertContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);

  const refetch = () => setShouldRefetch((prev) => !prev);

  const logout = async () => {
    try {
      const response = await axios.get("/api/user/logout");
      setUser(null);
      showAlert(
        response.data.message,
        response.data.success.message,
        "alert-success",
        2000
      );
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/user/secure");
        if (response && response.data) {
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      }
    };

    if (shouldRefetch) {
      fetchData();
      setShouldRefetch(false);
    }
  }, [shouldRefetch]);

  return (
    <UserContext.Provider value={{ user, isLoggedIn: !!user, refetch, logout }}>
      {children}
    </UserContext.Provider>
  );
};
