import Tooltip from "../tooltip/Tooltip";
export default function CircleButton({
  icon,
  onClick,
  disabled,
  btnColor,
  tooltipPosition,
  tooltipText,
  tooltipColor,
  btnSize,
}) {
  return (
    <Tooltip
      tooltipColor={tooltipColor}
      tooltipPosition={tooltipPosition}
      tooltipText={tooltipText}
    >
      <button
        onClick={onClick}
        className={`btn btn-circle text-2xl ${btnColor}  ${btnSize} text-base-content bg-opacity-40 border-none hover:text-base-content hover:text-opacity-80 hover:$`}
        disabled={disabled}
      >
        {icon}
      </button>
    </Tooltip>
  );
}
