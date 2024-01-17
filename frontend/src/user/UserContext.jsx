import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const navigate = useNavigate();

  const refetch = () => setShouldRefetch((prev) => !prev);

  const logout = async () => {
    try {
      await axios.get("/api/user/logout");
      setUser(null);
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
