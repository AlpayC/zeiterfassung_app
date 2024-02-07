import { capitalizeString } from "../../../utils/capitalizeString";
import useFormValidation from "../../../hooks/useFormValidation";
import { useState } from "react";

export default function InputField({ name, type, placeholder }) {
  const capitalizedName = capitalizeString(name);
  const [inputValues, setInputValues] = useState({});
  const { error, setError } = useFormValidation(inputValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };
  return (
    <label className="form-control w-full max-w-xs" htmlFor={`User${name}`}>
      <div className="label">
        <span className="label-text">Wie lautet dein/e {capitalizedName}?</span>
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`input input-bordered w-full max-w-xs ${
          error ? "border-accent border-4  " : "input-bordered"
        }`}
        autoComplete="off"
        onBlur={handleInputChange}
        onChange={() => setError(null)}
      />
      {error && <p className="error-message text-accent">{error}</p>}
    </label>
  );
}
