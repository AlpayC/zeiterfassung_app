import { useEffect, useState } from "react";
import { FaPlayCircle, FaStop } from "react-icons/fa";

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
      className={`btn btn-lg btn-outline ${
        disabled ? "btn-disabled" : "btn-primary"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {buttonName}
      {label === "Start" ? (
        disabled ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <FaPlayCircle />
        )
      ) : (
        <FaStop />
      )}
    </button>
  );
}
