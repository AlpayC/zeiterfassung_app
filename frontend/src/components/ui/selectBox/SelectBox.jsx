import { useState, useEffect, useRef } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

export default function SelectBox({ selection, active, setActive, onClick }) {
  const [activeSelectionLabel, setActiveSelectionLabel] = useState();
  const [activeBadgeColor, setActiveBadgeColor] = useState();
  const [selectBoxOpen, setSelectBoxOpen] = useState(false);
  const selectBoxRef = useRef(null);

  const toggle = (e, label, color) => {
    e.preventDefault();
    setSelectBoxOpen((prev) => !prev);
    if (label !== undefined && active) {
      setActiveSelectionLabel(label);
    }
    if (color !== undefined && active) {
      setActiveBadgeColor(color);
    }
    if (active) {
      setActive({
        label: label,
        color: color,
        status: true,
      });
    }
  };
  const openSelection = (e) => {
    e.preventDefault();

    setSelectBoxOpen((prev) => !prev);
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

  useEffect(() => {
    if (active) {
      setActiveSelectionLabel(active?.label);
      setActiveBadgeColor(active?.color);
    }
  }, [active]);

  return (
    <div ref={selectBoxRef} className={`dropdown `}>
      <div
        tabIndex={0}
        role="button"
        className={`btn font-poppins-regular font-medium h-8 min-h-8 rounded-xl bg-neutral text-white `}
        onClick={(e) => openSelection(e)}
      >
        <div
          className={`badge ${activeBadgeColor} focus-within::bg-brown badge-xs`}
        ></div>

        {activeSelectionLabel}
        {selectBoxOpen ? <FaCaretUp /> : <FaCaretDown />}
      </div>
      <ul
        tabIndex={0}
        className={`${
          selectBoxOpen
            ? "dropdown-content dropdown-open menu z-50 p-2 shadow bg-base-100 rounded-box w-52 "
            : "dropdown-content -z-10"
        }`}
      >
        {Array.isArray(selection) &&
          selection.map((item, index) => (
            <li key={index}>
              <a
                onClick={(e) => {
                  toggle(e, item.label, item.color);
                  onClick(selection, item);
                }}
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
