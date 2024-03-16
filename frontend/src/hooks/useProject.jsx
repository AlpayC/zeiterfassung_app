import { AlertContext } from "../context/AlertContext";
import { UserContext } from "../user/UserContext";
import { useContext } from "react";
import axios from "axios";
import { ProjectsContext } from "../context/ProjectContext";
import { useNavigate } from "react-router-dom";

export default function useProject({ projectTitle, projectDescription, id }) {
  const { showAlert } = useContext(AlertContext);
  const { user } = useContext(UserContext);
  const { refetchProjects } = useContext(ProjectsContext);
  const nav = useNavigate();

  const updateProject = async ({
    newStartDate,
    newEndDate,
    projectStatus,
    newActiveStatus,
    newTags,
  }) => {
    const projectStatuses = await projectStatus?.map((status) => ({
      ...status,
      status: status.title === newActiveStatus.title,
    }));

    const requestData = {
      title: projectTitle,
      email: user.email,
      startDate: newStartDate,
      endDate: newEndDate,
      description: projectDescription,
      tags: newTags,
      projectId: id,
      projectStatus: projectStatuses,
    };
    try {
      const response = await axios.put(
        `/api/projectmanagement/updateProject/${id}`,
        requestData
      );
      showAlert(
        `${response?.data.message}`,
        `${response?.data.success.message}`,
        "alert-success",
        3000
      );
      console.log(response);
      refetchProjects();
    } catch (e) {
      console.error("Error:", e);
      showAlert(
        `${e.response?.data.message}`,
        ` ${e.response?.data.error.message}`,
        "alert-error",
        4000
      );
    }
  };

  const deleteProject = async () => {
    const requestData = {
      email: user.email,
      projectId: id,
    };

    try {
      const response = await axios.delete(
        `/api/projectmanagement/deleteProject/${id}`,
        { data: requestData }
      );
      showAlert(
        `${response?.data.message}`,
        `${response?.data.success.message}`,
        "alert-success",
        3000
      );
      refetchProjects();
      nav("/dashboard");
      console.log(response);
    } catch (e) {
      console.error("Error:", e);
      showAlert(
        `${e.response?.data.message}`,
        ` ${e.response?.data.error.message}`,
        "alert-error",
        4000
      );
    }
  };

  return {
    updateProject,
    deleteProject,
  };
}
