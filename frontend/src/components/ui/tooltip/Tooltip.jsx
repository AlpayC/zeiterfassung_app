export default function Tooltip({
  children,
  tooltipColor,
  tooltipPosition,
  tooltipText,
}) {
  return (
    <div
      className={`tooltip ${tooltipColor} ${tooltipPosition} font-poppins-semibold `}
      data-tip={tooltipText}
    >
      {children}
    </div>
  );
}
