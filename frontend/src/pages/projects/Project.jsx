import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProjectsContext } from "../../context/ProjectContext";
import Kbd from "../../components/ui/kbd/Kbd";
import SelectBox from "../../components/ui/selectBox/SelectBox";
import ImgUploadBtn from "../../components/ui/buttons/ImgUploadBtn";
import TagsOutput from "../../projectManagement/addProjectModal/TagsOutput";
import useProject from "../../hooks/useProject";
import { registerLocale } from "react-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import de from "date-fns/locale/de";
registerLocale("de", de);
import { PiChecksBold, PiCheckCircleBold } from "react-icons/pi";
import { TbCalendarPlus, TbCalendarMinus } from "react-icons/tb";
import useModal from "../../hooks/useModal";
import TagsModal from "../../projectManagement/addProjectModal/TagsModal";

export default function Project() {
  const { id } = useParams();
  const { projects } = useContext(ProjectsContext);
  const [project, setProject] = useState();
  const [projectTitle, setProjectTitle] = useState();
  const [projectDescription, setProjectDescription] = useState();
  const [projectStatus, setProjectStatus] = useState();
  const [activeStatus, setActiveStatus] = useState();
  const [inputOnFocus, setInputOnFocus] = useState(false);
  const [inputDescriptionOnFocus, setInputDescriptionOnFocus] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tags, setTags] = useState([]);
  const { updateProject, updateProjectStatus, updateProjectTags } = useProject({
    tags,
    projectTitle,
    startDate,
    endDate,
    id,
    projectDescription,
    projectStatus,
  });

  useEffect(() => {
    if (projects && id) {
      const filteredProject = projects.find((proj) => proj._id === id);
      setProject(filteredProject);
      setProjectTitle(filteredProject.title);
      setProjectDescription(filteredProject.description);
      setStartDate(filteredProject.startDate);
      setEndDate(filteredProject.endDate);
      setTags(filteredProject.tags);
      setProjectStatus(filteredProject.projectStatus);

      setActiveStatus(
        filteredProject.projectStatus.find((status) => status.status === true)
      );
    }
  }, [projects, id, project, projectStatus]);

  const kbdList = [
    {
      title: "Speichern",
      key: " ↵ ",
    },
  ];

  const { modalOpen, closeModal, openModal } = useModal();
  const removeTags = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
    updateProjectTags(newTags);
  };
  return (
    <section className="overflow-y-scroll w-full">
      <article className="card bg-base-300 shadow-xl p-6  rounded-2xl m-10">
        <SelectBox
          selection={projectStatus}
          startLabel={activeStatus?.label}
          active={activeStatus}
          setActive={(newActiveStatus) => {
            setActiveStatus(newActiveStatus);
            updateProjectStatus(projectStatus, newActiveStatus);
          }}
          onClick={(selectedStatus) => {
            const newActiveStatus = projectStatus.find(
              (status) => status.label === selectedStatus.label
            );
            setActiveStatus(newActiveStatus);
          }}
        />
        <div className="flex mt-6">
          <ImgUploadBtn />
          <div className="relative w-full flex flex-col min-h-max pb-11 ">
            <input
              type="text"
              className="input input-ghost bg-base-100 w-full text-3xl"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              onFocus={() => setInputOnFocus(true)}
              onBlur={() => setInputOnFocus(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateProject(e);
                }
              }}
            />
            {inputOnFocus && (
              <Kbd keyList={kbdList} position={"absolute bottom-0 right-0"} />
            )}
          </div>
        </div>
        <div className="flex gap-2 mb-2 items-center pb-6">
          <p className="mr-2">Tags</p>
          {tags.length > 0 && (
            <div className="flex gap-4 mr-2">
              <TagsOutput tags={tags} removeTags={removeTags} />
            </div>
          )}
          <button
            className="flex gap-2 btn btn-primary btn-outline btn-xs border-dashed"
            onClick={openModal}
          >
            Hinzufügen
          </button>

          <TagsModal
            closeModal={closeModal}
            modalOpen={modalOpen}
            id={id}
            oldTags={tags}
          />
        </div>
        <div className="relative w-full flex flex-col min-h-max pb-11 mb-6">
          <textarea
            rows="4"
            cols="50"
            className="textarea textarea-ghost bg-base-100  "
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            onFocus={() => setInputDescriptionOnFocus(true)}
            onBlur={() => setInputDescriptionOnFocus(false)}
            placeholder="Beschreibung"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateProject(e);
              }
            }}
          />
          {inputDescriptionOnFocus && (
            <Kbd keyList={kbdList} position={"absolute bottom-0 right-0"} />
          )}
        </div>
        <section className="relative w-full flex flex-row justify-center min-h-max pb-12 mb-2 gap-5">
          <div className="card bg-secondary bg-opacity-60 flex p-5 ">
            <p className="flex items-center gap-2">
              <TbCalendarPlus className="text-2xl " />
              Startzeit
            </p>
            <DatePicker
              className="bg-secondary bg-opacity-0 w-full card-body focus-visible:outline-none "
              selected={startDate}
              locale="de"
              dateFormat={"dd.MM.yyyy"}
              onChange={(date) => setStartDate(date)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateProject(e);
                }
              }}
            />
          </div>
          <div className="card  bg-primary bg-opacity-60 flex p-5">
            <p className="flex items-center gap-2">
              <TbCalendarMinus className="text-2xl " />
              Endzeit
            </p>
            <DatePicker
              className="bg-primary bg-opacity-0 w-full card-body focus-visible:outline-none"
              selected={endDate}
              locale="de"
              dateFormat={"dd.MM.yyyy"}
              onChange={(date) => setEndDate(date)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateProject(e);
                }
              }}
            />
          </div>
          <div className="card  bg-accent bg-opacity-60 flex p-5">
            <p className="flex items-center gap-2">
              <PiChecksBold className="text-2xl " />
              Aufgaben
            </p>
            <DatePicker
              className="bg-accent bg-opacity-0 w-full card-body focus-visible:outline-none"
              selected={endDate}
              locale="de"
              dateFormat={"dd.MM.yyyy"}
              onChange={(date) => setEndDate(date)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateProject(e);
                }
              }}
            />
          </div>
          <div className="card  bg-success bg-opacity-60 flex p-5">
            <p className="flex items-center gap-2">
              <PiCheckCircleBold className="text-2xl " />
              Fortschritt
            </p>
            <DatePicker
              className="bg-secondary bg-opacity-0 w-full card-body focus-visible:outline-none"
              selected={endDate}
              locale="de"
              dateFormat={"dd.MM.yyyy"}
              onChange={(date) => setEndDate(date)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateProject(e);
                }
              }}
            />
          </div>
        </section>
      </article>
    </section>
  );
}
