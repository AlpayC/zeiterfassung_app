import { FiLogIn, FiUserPlus } from "react-icons/fi";

export default function FormButton({ label, type }) {
  return (
    <button type={type} className="btn btn-lg  btn-primary">
      {label}
      {label === "Login" ? <FiLogIn /> : <FiUserPlus />}
    </button>
  );
}
