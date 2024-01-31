import { PiPlusBold } from "react-icons/pi";

export default function AddButton({ label }) {
  return (
    <div className="text-lg font-poppins-semibold btn-block justify-between items-center flex my-5">
      {label}
      <button className="btn btn-circle bg-base-100">
        <PiPlusBold className="text-3xl " />
      </button>
    </div>
  );
}
