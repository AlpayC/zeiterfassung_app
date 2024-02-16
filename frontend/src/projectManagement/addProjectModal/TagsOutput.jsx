export default function TagsOutput({ tags, removeTags }) {
  return (
    <>
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
    </>
  );
}
