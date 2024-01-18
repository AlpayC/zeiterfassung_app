import "@tailwindcss/forms";
import { capitalizeString } from "../../../utils/capitalizeString";
export default function InputField({ name, type, placeholder }) {
  const capitalizedName = capitalizeString(name);

  return (
    <label
      htmlFor={`User${name}`}
      className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 w-1/4"
    >
      <input
        type={type}
        name={name}
        id={`User${name}`}
        placeholder={placeholder}
        className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-2xl"
      />

      <span className="absolute start-3 top-3 -translate-y-1/2 text-2xl text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-2xl peer-focus:top-3 peer-focus:text-xl">
        {capitalizedName}
      </span>
    </label>
  );
}
