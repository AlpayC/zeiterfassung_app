import Tooltip from "../tooltip/Tooltip";
import { LuImagePlus } from "react-icons/lu";

export default function ImgUploadBtn({
  uploadPictureInput,
  setAvatarUrl,
  avatarUrl,
}) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarUrl("");
    }
  };

  return (
    <Tooltip
      tooltipColor={"tooltip-secondary"}
      tooltipText={"Lade ein Bild hoch"}
      tooltipPosition={"tooltip-right"}
    >
      <label className="btn btn-circle bg-base-300 ">
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/*"
          ref={uploadPictureInput}
        />
        {avatarUrl ? (
          <div className="avatar indicator">
            <span
              className="indicator-item badge badge-error badge-xs text-white hover:bg-opacity-60 hover:cursor-pointer aspect-square p-2"
              onClick={() => setAvatarUrl(null)}
            >
              x
            </span>

            <div className="w-12 rounded-full">
              <img src={avatarUrl} />
            </div>
          </div>
        ) : (
          <LuImagePlus className=" text-2xl" />
        )}
      </label>
    </Tooltip>
  );
}
