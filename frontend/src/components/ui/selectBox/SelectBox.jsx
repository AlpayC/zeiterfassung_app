import { useState, useEffect, useRef } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

export default function SelectBox({ data, startLabel }) {
  const [listSelection, setListSelection] = useState(startLabel || "Inbox");
  const [selectBoxOpen, setSelectBoxOpen] = useState(false);
  const [badgeColor, setBadgeColor] = useState("bg-red-500");
  const selectBoxRef = useRef(null);

  const toggle = (e, label, color) => {
    e.preventDefault();
    setSelectBoxOpen((prev) => !prev);
    setListSelection(label !== undefined ? label : listSelection);
    setBadgeColor(color !== undefined ? color : badgeColor);
  };

  const handleOutsideClick = (event) => {
    if (selectBoxRef.current && !selectBoxRef.current.contains(event.target)) {
      setSelectBoxOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={selectBoxRef} className={`dropdown `}>
      <div
        tabIndex={0}
        role="button"
        className={`btn font-poppins-regular font-medium h-8 min-h-8 rounded-xl bg-neutral text-white `}
        onClick={(e) => toggle(e)}
      >
        <div
          className={`badge ${badgeColor} focus-within::bg-brown badge-xs`}
        ></div>

        {listSelection}
        {selectBoxOpen ? <FaCaretUp /> : <FaCaretDown />}
      </div>
      <ul
        tabIndex={0}
        className={`${
          selectBoxOpen
            ? "dropdown-content dropdown-open menu z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            : "dropdown-content -z-10"
        }`}
      >
        {data.map((item, index) => (
          <li key={index}>
            <a
              onClick={(e) => toggle(e, item.label, item.color)}
              value={item.label}
            >
              {item.label}
              <div className={`badge ${item.color} badge-xs`}></div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
