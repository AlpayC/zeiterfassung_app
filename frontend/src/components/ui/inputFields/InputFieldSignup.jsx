import { capitalizeString } from "../../../utils/capitalizeString";

export default function InputFieldSignup({ name, placeholder, type }) {
  const capitalizedName = capitalizeString(name);

  return (
    <label
      htmlFor={`User${name}`}
      className="block overflow-hidden rounded-md border  text-left border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 w-1/4"
    >
      <span className="text-xl  font-medium text-gray-700">
        {" "}
        {capitalizedName}{" "}
      </span>

      <input
        type={type}
        id={`User${name}`}
        placeholder={placeholder}
        className="peer h-12 w-full border-none bg-transparent p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-2xl"
      />
    </label>
  );
}
