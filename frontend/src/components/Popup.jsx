import { useState, useEffect } from "react";
import { MdError, MdDone, MdClose } from "react-icons/md";

export default function Popup({ errorDescription, messageType, title }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      role="alert"
      className={`rounded-xl border border-gray-100 bg-white p-4 absolute top-10 right-10 transition-all  duration-500 ${
        show ? "opacity-100 " : "opacity-0"
      }`}
    >
      <div className="flex items-start gap-4">
        {messageType === "error" ? (
          <span className="text-red-600 text-4xl">
            <MdError />
          </span>
        ) : (
          <span className="text-green-600 text-4xl">
            <MdDone />
          </span>
        )}

        <div className="flex-1 text-left">
          <strong className="block font-medium text-2xl text-gray-900">
            {messageType === "error"
              ? `${title} fehlgeschlagen`
              : `${title} erfolgreich`}
          </strong>

          <p className="mt-1 text-2xl text-gray-700">{errorDescription}</p>
        </div>

        <button
          className="text-gray-500 transition hover:text-gray-600 text-2xl"
          onClick={() => setShow(false)}
          type="button"
        >
          <MdClose />
        </button>
      </div>
    </div>
  );
}
