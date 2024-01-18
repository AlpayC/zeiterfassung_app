import { useEffect, useState } from "react";
import { FaPlayCircle, FaStop } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function TrackerButton({ type, label, onClick, disabled }) {
  const [buttonName, setButtonName] = useState(label);
  useEffect(() => {
    if (disabled === false && label === "Start") {
      setButtonName("Start");
    } else if (disabled === true && label === "Start") {
      setButtonName("Zeiterfassung läuft");
    } else {
      setButtonName(label);
    }
  }, [disabled, label]);

  return (
    <button
      type={type}
      className={`px-10 py-6 text-3xl font-medium gap-6 inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  dark:focus:ring-blue-800 ${
        disabled
          ? "dark:bg-blue-400 dark:hover:bg-blue-500"
          : "dark:bg-blue-600 dark:hover:bg-blue-700"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {buttonName}
      {label === "Start" ? (
        disabled ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          <FaPlayCircle />
        )
      ) : (
        <FaStop />
      )}
    </button>
  );
}
