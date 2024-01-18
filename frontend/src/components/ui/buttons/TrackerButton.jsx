import { FaPlayCircle, FaStop } from "react-icons/fa";

export default function TrackerButton({ type, label, onClick, disabled }) {
  return (
    <button
      type={type}
      className="px-10 py-6 text-3xl font-medium gap-6 inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      disabled={disabled}
      onClick={onClick}
    >
      {label}
      {label === "Start" ? <FaPlayCircle /> : <FaStop />}
    </button>
  );
}
