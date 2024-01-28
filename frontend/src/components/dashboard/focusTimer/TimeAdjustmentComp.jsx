import { useEffect } from "react";

import CircleButton from "../../ui/buttons/CircleButton";
import { FaMinus, FaPlus } from "react-icons/fa";
export default function TimeAdjustmentComp({ focusTime, setFocusTime }) {
  const adjustMinutes = (direction) => {
    if (direction === "down") {
      if (focusTime <= 15) {
        setFocusTime(focusTime - 5);
      } else {
        setFocusTime(focusTime - 15);
      }
    } else {
      if (focusTime >= 15) {
        setFocusTime(focusTime + 15);
      } else {
        setFocusTime(focusTime + 5);
      }
    }
  };
  useEffect(() => {
    if (focusTime === 0) {
      setFocusTime(5);
    }
  }, [focusTime]);
  return (
    <div className="card-actions flex justify-center items-center gap-6">
      <CircleButton icon={<FaMinus />} onClick={() => adjustMinutes("down")} />
      <p className="text-3xl text-center flex-grow-0">{focusTime} min</p>
      <CircleButton icon={<FaPlus />} onClick={() => adjustMinutes("up")} />
    </div>
  );
}
