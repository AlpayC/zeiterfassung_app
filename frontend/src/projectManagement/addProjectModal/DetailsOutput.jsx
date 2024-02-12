import { useContext } from "react";
import { AlertContext } from "../../context/AlertContext";

export default function DetailsOutput({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  tags,
  setTags,
}) {
  const { showAlert } = useContext(AlertContext);

  const removeTags = (index) => {
    const newTags = [...tags];
    showAlert(`Tag ${newTags} gelöscht`, ``, "alert-error", 3000);
    newTags.splice(index, 1);
    setTags(newTags);
  };
  const deleteDate = (position) => {
    if (position === "end") {
      showAlert(`Enddatum ${endDate} gelöscht`, ``, "alert-error", 3000);
      setEndDate(null);
    } else if (position === "start") {
      showAlert(`Startdaum ${startDate} gelöscht`, ``, "alert-error", 3000);
      setStartDate(null);
    }
  };
  return (
    <section className="flex items-center justify-center gap-4">
      {startDate ? (
        <div className="badge badge-success badge-outline indicator  ">
          <span> Start: {startDate}</span>
          <span
            className="indicator-item badge badge-error badge-xs text-white hover:bg-opacity-60 hover:cursor-pointer aspect-square p-2"
            onClick={() => deleteDate("start")}
          >
            x
          </span>
        </div>
      ) : (
        <></>
      )}
      {endDate ? (
        <div className="badge badge-success badge-outline indicator">
          <span> Ende: {endDate}</span>
          <span
            className="indicator-item badge badge-error badge-xs text-white hover:bg-opacity-60 hover:cursor-pointer aspect-square p-2"
            onClick={() => deleteDate("end")}
          >
            x
          </span>
        </div>
      ) : (
        <></>
      )}
      {tags?.map((tag, index) => {
        const classes = [
          "badge-primary",
          "badge-secondary",
          "badge-accent",
          "badge-info",
          "badge-warning",
          "badge-success",
        ];
        const classIndex = index % classes.length;
        const className = `badge ${classes[classIndex]} badge-outline`;
        return (
          <div key={index} className={`${className} indicator`}>
            <span>#{tag.toLowerCase()}</span>
            <span
              className="indicator-item badge badge-error badge-xs text-white hover:bg-opacity-60 hover:cursor-pointer aspect-square p-2"
              onClick={() => removeTags(index)}
            >
              x
            </span>
          </div>
        );
      })}
    </section>
  );
}
