export default function CircleButton({ icon, onClick }) {
  return (
    <button onClick={onClick} className="btn btn-circle text-2xl bg-secondary">
      {icon}
    </button>
  );
}
