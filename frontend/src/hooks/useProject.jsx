import { AlertContext } from "../context/AlertContext";
import { UserContext } from "../user/UserContext";
import { useContext } from "react";
import axios from "axios";
import { ProjectsContext } from "../context/ProjectContext";
import { useNavigate } from "react-router-dom";

export default function useProject({
  projectTitle,
  startDate,
  endDate,
  projectDescription,
  tags,
  id,
}) {
  const { showAlert } = useContext(AlertContext);
  const { user } = useContext(UserContext);
  const { refetchProjects } = useContext(ProjectsContext);
  const nav = useNavigate();
  const updateProject = async (event) => {
    if (event) {
      event.preventDefault();
    }
    const requestData = {
      title: projectTitle,
      email: user.email,
      startDate: startDate,
      endDate: endDate,
      description: projectDescription,
      tags: tags,
      projectId: id,
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
      refetchProjects();
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
  const updateProjectStatus = async (projectStatus, newActiveStatus) => {
    const projectStatuses = await projectStatus.map((status) => ({
      ...status,
      status: status.label === newActiveStatus.label,
    }));

    const requestData = {
      email: user.email,
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
      refetchProjects();
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
  const updateProjectTags = async (tags) => {
    const requestData = {
      email: user.email,
      projectId: id,
      tags: tags,
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
      refetchProjects();
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
    updateProjectStatus,
    updateProjectTags,
    deleteProject,
  };
}
