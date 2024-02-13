import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../user/UserContext";
export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState(null);
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const { user } = useContext(UserContext);
  const refetchProjects = () => setShouldRefetch((prev) => !prev);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (user) {
          const response = await axios.get(
            `/api/projectmanagement/getProjects`,
            {
              params: {
                email: user.email,
              },
            }
          );
          if (response && response.data) {
            setProjects(response.data);
            console.log(projects);
          } else {
            setProjects(null);
          }
        }
      } catch (error) {
        console.error("Error fetching projects data:", error);
        setProjects(null);
      }
    };

    if (shouldRefetch && user) {
      fetchProjects();
      setShouldRefetch(false);
    }
  }, [shouldRefetch, user]);

  return (
    <ProjectsContext.Provider value={{ projects, refetchProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};
