import { useEffect, useContext } from "react";
import { AlertContext } from "../../../context/AlertContext";
export default function Alert() {
  const { alertState, hideAlert } = useContext(AlertContext);

  useEffect(() => {
    if (alertState) {
      console.log(alertState);
      const timer = setTimeout(() => {
        hideAlert();
      }, alertState.duration);

      return () => clearTimeout(timer);
    }
  }, [alertState, hideAlert]);

  if (!alertState) {
    return null;
  }

  const { description, alertType, title } = alertState;

  return (
    <div
      role="alert"
      className={`w-max alert ${alertType} absolute top-16 right-6  z-[1000]`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        {alertType === "alert-error" && (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        )}
        {alertType === "alert-warning" && (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        )}
        {alertType === "alert-success" && (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        )}
        {alertType === "alert-info" && (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        )}
      </svg>
      <div className="flex flex-col">
        <h3 className="font-bold">{title}</h3>
        <div className="text-s">{description}</div>
      </div>
    </div>
  );
}
