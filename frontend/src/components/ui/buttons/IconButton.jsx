export default function IconButton({ type, label, onClick, icon, isActive }) {
  return (
    <button
      type={type}
      className={`btn btn-sm rounded-xl ${
        isActive ? "bg-secondary" : "bg-neutral"
      } text-white font-medium`}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}
