import { useState, useRef, useContext } from "react";
import axios from "axios";
import Modal from "../../components/ui/modals/Modal";
import ShortcutOverlay from "../../components/ui/overlays/ShortcutOverlay";
import Tooltip from "../../components/ui/tooltip/Tooltip";
import { useProjectDetailsEffects } from "../../hooks/useProjectDetailsEffects";
import { AlertContext } from "../../context/AlertContext";
import { UserContext } from "../../user/UserContext";
import DetailsOutput from "./DetailsOutput";
import ImgUploadBtn from "../../components/ui/buttons/ImgUploadBtn";
import { ProjectsContext } from "../../context/ProjectContext";
export default function AddProjectModal({ closeModal, modalOpen }) {
  const { showAlert } = useContext(AlertContext);
  const { user } = useContext(UserContext);
  const { refetchProjects } = useContext(ProjectsContext);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tags, setTags] = useState([]);
  const [showProjectDescriptionInput, setShowProjectDescriptionInput] =
    useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  const projectDescriptionInput = useRef(null);
  const uploadPictureInput = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      title: projectTitle,
      email: user.email,
      startDate: startDate,
      endDate: endDate,
      description: projectDescription,
      tags: tags,
    };
    try {
      const response = await axios.post(
        "/api/projectmanagement/addProject",
        requestData
      );
      showAlert(
        `${response?.data.message}`,
        `${response?.data.success.message}`,
        "alert-success",
        3000
      );
      closeModal();
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

  const handleInput = (e) => {
    setProjectTitle(e.target.value);
  };

  useProjectDetailsEffects(
    projectTitle,
    projectDescription,
    tags,
    startDate,
    endDate,
    projectDescriptionInput,
    uploadPictureInput,
    setProjectTitle,
    setProjectDescription,
    setShowProjectDescriptionInput,
    setStartDate,
    setEndDate,
    setTags
  );

  const overlayList = [
    {
      title: "Startdatum",
      key: "/start 10.10.2022",
    },
    {
      title: "Enddatum",
      key: "/end 11.11.2025",
    },
    {
      title: "Beschreibung",
      key: "//",
    },
    {
      title: "Bild hochladen",
      key: "/bild",
    },
    {
      title: "Tags hinzufügen",
      key: "/#",
    },
  ];

  return (
    <>
      <Modal
        closeModal={closeModal}
        modalOpen={modalOpen}
        shortcutOverlay={
          <ShortcutOverlay
            shortcutKey={"/"}
            overlayTitle={"Details"}
            shortcutList={overlayList}
          />
        }
      >
        <div className="flex flex-col items-center justify-evenly ">
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
            <div className="flex w-full gap-4 ">
              <ImgUploadBtn
                uploadPictureInput={uploadPictureInput}
                setAvatarUrl={setAvatarUrl}
                avatarUrl={avatarUrl}
              />
              <div className="w-full flex gap-2 flex-col">
                <input
                  type="text"
                  placeholder="Projekt benennen"
                  className="input input-bordered input-secondary bg-base-300 w-full"
                  onChange={handleInput}
                  value={projectTitle}
                />
                <input
                  ref={projectDescriptionInput}
                  type="text"
                  placeholder="Projektbeschreibung hinzufügen"
                  className={`input input-bordered input-secondary bg-base-300 w-full ${
                    showProjectDescriptionInput
                      ? "animated-input.show"
                      : "animated-input "
                  }`}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </div>
              <Tooltip
                tooltipColor={"tooltip-success"}
                tooltipText={"Speichere dein Projekt "}
                tooltipPosition={"tooltip-left"}
              >
                <button className="btn btn-success">Weiter</button>
              </Tooltip>
            </div>
            <DetailsOutput
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              tags={tags}
              setTags={setTags}
            />
          </form>
        </div>
      </Modal>
    </>
  );
}
