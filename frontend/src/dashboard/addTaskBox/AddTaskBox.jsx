import {
  FaSave,
  FaClock,
  FaRegClock,
  FaPlus,
  FaCalendarAlt,
} from "react-icons/fa";
import IconButton from "../../components/ui/buttons/IconButton";
import SelectBox from "../../components/ui/selectBox/SelectBox";
import { useState } from "react";

const selectionData = [
  {
    label: "Inbox",
    color: "bg-red-500",
  },
  {
    label: "Arbeit",
    color: "bg-blue-500",
  },
  {
    label: "Studium",
    color: "bg-yellow-500",
  },
  {
    label: "Gesundheit",
    color: "bg-green-500",
  },
  {
    label: "Reise",
    color: "bg-purple-500",
  },
];
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

  const handleButtonClick = (index) => {
    setActiveButtonIndex((prevIndex) => (prevIndex === index ? null : index));
  };

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
        <SelectBox size={""} data={selectionData} />
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
