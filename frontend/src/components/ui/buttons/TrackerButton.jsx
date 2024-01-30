import { useEffect, useState } from "react";
import { FaPlayCircle, FaStop } from "react-icons/fa";

export default function TrackerButton({
  type,
  label,
  onClick,
  disabled,
  trackingType,
}) {
  const [buttonName, setButtonName] = useState(label);
  useEffect(() => {
    if (disabled === false && label === "Start") {
      setButtonName("Start");
    } else if (disabled === true && label === "Start") {
      setButtonName(`${trackingType} läuft`);
    } else if (
      disabled === false &&
      label === "Stop" &&
      trackingType === "Pomodoro"
    ) {
      setButtonName(`${trackingType} läuft`);
    } else {
      setButtonName(label);
    }
  }, [disabled, label, trackingType]);

  return (
    <button
      type={type}
      className={`btn btn-lg  ${
        disabled ? "btn-disabled" : "btn-secondary"
      }  rounded-2xl`}
      disabled={disabled}
      onClick={onClick}
    >
      {label === "Start" ? (
        disabled ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <FaPlayCircle />
        )
      ) : (
        <FaStop />
      )}
      {buttonName}
    </button>
  );
}
