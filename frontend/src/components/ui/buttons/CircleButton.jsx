export default function CircleButton({ icon, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      className="btn btn-circle text-2xl bg-secondary"
      disabled={disabled}
    >
      {icon}
    </button>
  );
}
