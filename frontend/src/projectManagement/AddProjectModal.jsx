import { useEffect, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import axios from "axios";
import Modal from "../components/ui/modals/Modal";
import ShortcutOverlay from "../components/ui/overlays/ShortcutOverlay";
import Tooltip from "../components/ui/tooltip/Tooltip";

export default function AddProjectModal({ closeModal, modalOpen }) {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [tags, setTags] = useState([]);
  const [showProjectDescriptionInput, setShowProjectDescriptionInput] =
    useState(false);

  useEffect(() => {
    console.log(tags);
  }, [tags]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      title: projectTitle,
      email: "alpaycelik@web.de",
      startDate: startDate,
      endDate: endDate,
      description: projectDescription,
    };
    closeModal();
    try {
      const response = await axios.post(
        "/api/projectmanagement/addProject",
        requestData
      );

      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInput = (e) => {
    setProjectTitle(e.target.value);
    let inputValue = e.target.value;
    if (inputValue.includes("//")) {
      setShowProjectDescriptionInput(true);
      const nextInput = e.target.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
        inputValue = inputValue.replace("//", "");
        e.target.value = inputValue;
      }
    }
    if (inputValue.includes("/start")) {
      setShowStartDate(true);
      const startDateInput = e.target.nextElementSibling;
      if (startDateInput) {
        console.log("jo");
        startDateInput.focus();
        inputValue = inputValue.replace("//", "");
        e.target.value = inputValue;
      }
    }
    if (inputValue.includes("/bild")) {
      const fileInput = document.getElementById("fileInput");
      if (fileInput) {
        fileInput.click();
        inputValue = inputValue.replace("/bild", "");
        e.target.value = inputValue;
      }
    }
    // Check for "/#" and process tag
    if (inputValue.includes("/#")) {
      const tagPart = inputValue.split("/#")[1].trim(); // Get the tag part after "/#"
      if (tagPart) {
        const updatedValue = inputValue.replace("/#", "#"); // Replace "/#" with "#"
        e.target.value = updatedValue;
      }
    }

    // Split input value by spaces
    const words = inputValue.split(" ");

    // Check for words starting with "#" and process tags
    const newTags = [];
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (word.startsWith("#") && i < words.length - 1 && words[i + 1] === "") {
        const tagName = word.substring(1); // Remove "#" from the beginning
        if (!tags.includes(tagName)) {
          newTags.push(tagName); // Add tag to the newTags array if it's not already in the tags array
        }
      }
    }
    setTags((prevTags) => [...prevTags, ...newTags]); // Add new tags to the tags array

    // Check if a tag has been removed and update the tags array accordingly
    const removedTags = tags.filter((tag) => !inputValue.includes(`#${tag}`));
    if (removedTags.length > 0) {
      setTags((prevTags) =>
        prevTags.filter((tag) => !removedTags.includes(tag))
      );
    }
  };

  useEffect(() => {
    if (projectDescription === "") {
      setShowProjectDescriptionInput(false);
    }
  }, [projectDescription]);

  const overlayList = [
    {
      title: "Startdatum",
      key: "/start 10.10.2022",
    },
    {
      title: "Enddatum",
      key: "/end 11.11.2022",
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
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarUrl("");
    }
  };
  return (
    <>
      <Modal
        closeModal={closeModal}
        modalOpen={modalOpen}
        showPopups={showStartDate}
        shortcutOverlay={
          <ShortcutOverlay
            shortcutKey={"/"}
            overlayTitle={"Details"}
            shortcutList={overlayList}
          />
        }
      >
        <div className="flex flex-col items-center justify-evenly ">
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
            <div className="flex w-full gap-4 ">
              <Tooltip
                tooltipColor={"tooltip-secondary"}
                tooltipText={"Lade ein Bild hoch"}
                tooltipPosition={"tooltip-right"}
              >
                <label className="btn btn-circle bg-base-300 ">
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  {avatarUrl ? (
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img src={avatarUrl} />
                      </div>
                    </div>
                  ) : (
                    <LuImagePlus className=" text-2xl" />
                  )}
                </label>
              </Tooltip>
              <div className="w-full flex gap-2 flex-col">
                <input
                  type="text"
                  placeholder="Projekt benennen"
                  className="input input-bordered input-secondary bg-base-300 w-full"
                  onChange={handleInput}
                />

                <input
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
            <div className="flex items-center justify-center gap-2">
              {tags?.map((tag, index) => {
                const classes = [
                  "badge-primary",
                  "badge-secondary",
                  "badge-accent",
                  "badge-info",
                  "badge-warning",
                  "badge-success",
                ];
                const classIndex = index % classes.length;
                const className = `badge ${classes[classIndex]} badge-outline`;
                return (
                  <div key={index} className={className}>
                    #{tag.toLowerCase()}
                  </div>
                );
              })}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
