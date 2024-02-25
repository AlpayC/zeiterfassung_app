import {
  FaSave,
  FaClock,
  FaRegClock,
  FaPlus,
  FaCalendarAlt,
} from "react-icons/fa";
import IconButton from "../../../components/ui/buttons/IconButton";
import SelectBox from "../../../components/ui/selectBox/SelectBox";
import { ProjectsContext } from "../../../context/ProjectContext";
import { useContext, useEffect, useState } from "react";

const buttonData = [
  {
    label: "Heute",
    icon: <FaRegClock />,
  },
  {
    label: "Morgen",
    icon: <FaRegClock />,
  },
  {
    label: "Nächste Woche",
    icon: <FaRegClock />,
  },
  {
    label: "Benuzterdefiniert",
    icon: <FaCalendarAlt />,
  },
];

export default function AddTaskBox() {
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const { projects } = useContext(ProjectsContext);
  const handleButtonClick = (index) => {
    setActiveButtonIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const [activeProject, setActiveProject] = useState();

  return (
    <article className=" card task-box p-4 rounded-2xl bg-base-300 shadow-xl flex flex-col gap-3">
      <div className="justify-start items-center join w-full rounded-2xl ">
        <div className="input input-bordered join-item w-full pl-4 flex justify-start items-center gap-4  text-accent">
          <FaPlus />
          <input
            className="join-item input h-8 w-full bg-none focus:border-none"
            placeholder="Neue Aufgabe hinzufügen..."
          />

          <kbd className="kbd kbd-sm">Enter</kbd>
        </div>

        <button className="btn join-item bg-secondary text-xl ">
          <FaClock />
        </button>
        <button className="btn join-item bg-secondary text-xl">
          <FaSave />
        </button>
      </div>
      <div className="flex items-stretch gap-4">
        {projects && (
          <SelectBox
            selection={projects}
            active={projects[0]}
            setActive={(newActiveProject) => {
              setActiveProject(newActiveProject);
            }}
            onClick={(projects) => {
              const newActiveProject = projects.find(
                (project) => project.title === project.title
              );
              console.log({ newActiveProject });
              setActiveProject(newActiveProject);
            }}
          />
        )}

        {buttonData.map((button, index) => (
          <IconButton
            label={button.label}
            icon={button.icon}
            isActive={index === activeButtonIndex}
            onClick={() => handleButtonClick(index)}
            key={index}
          />
        ))}
      </div>
    </article>
  );
}
