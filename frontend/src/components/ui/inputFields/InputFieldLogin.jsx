import { capitalizeString } from "../../../utils/capitalizeString";
export default function InputField({ name, type, placeholder }) {
  const capitalizedName = capitalizeString(name);
  return (
    <label className="form-control w-full max-w-xs" htmlFor={`User${name}`}>
      <div className="label">
        <span className="label-text">Wie lautet dein/e {capitalizedName}?</span>
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
      />
    </label>
  );
}
