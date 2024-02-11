import { useEffect, useState, useRef } from "react";
import { getAllIcons } from "../../../utils/getIconComponent";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import de from "date-fns/locale/de";
import { IoClose } from "react-icons/io5";
import CircleButton from "../buttons/CircleButton";
import { PopoverPicker } from "../PopoverPicker";

export default function Modal({ type, onClose, modalOpen }) {
  const modalRef = useRef();

  const [modalTitle, setModalTitle] = useState();
  const [modalDescription, setModalDescription] = useState();
  const [icons, setIcons] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedIconIndex, setSelectedIconIndex] = useState(-1);
  const [selectedIcon, setSelectedIcon] = useState("");
  const iconsPerPage = 33;
  const [projectTitle, setProjectTitle] = useState("");
  const [color, setColor] = useState("#01aafd");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  registerLocale("de", de);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscapePress = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscapePress);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, [onClose]);

  useEffect(() => {
    setModalTitle("Projekt hinzufügen");
    setModalDescription("Füge hier ein Projekt hinzu");
    const allIcons = getAllIcons();
    setIcons(allIcons.slice(startIndex, startIndex + iconsPerPage));
    setSelectedIconIndex(-1);
    setDefaultLocale(de);
  }, [type, startIndex]);

  const handleNextPage = () => {
    const nextPageStartIndex = startIndex + iconsPerPage;
    setStartIndex(nextPageStartIndex);
  };

  const handlePreviousPage = () => {
    const previousPageStartIndex = Math.max(0, startIndex - iconsPerPage);
    setStartIndex(previousPageStartIndex);
  };

  const selectIcon = (index) => {
    const icon = getAllIcons()[startIndex + index];
    setSelectedIconIndex(index);
    console.log(icon.name);
    console.log(icon);
    setSelectedIcon(icon.name);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      title: projectTitle,
      color: color,
      icon: selectedIcon,
      email: "alpaycelik@web.de",
    };

    try {
      const response = await axios.post(
        "/api/projectmanagement/addProject",
        requestData
      );
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <dialog
        id="my_modal_2"
        className={`modal sm:modal-middle  ${
          modalOpen === true ? "modal-open" : ""
        } `}
      >
        <div className="modal-box relative" ref={modalRef}>
          <h3 className="font-bold text-2xl">{modalTitle}</h3>
          <p className="py-4">{modalDescription} </p>
          <div className="flex flex-row items-center justify-evenly">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <div className="flex flex-row mb-4 gap-6">
                <div className="flex flex-col gap-6">
                  <div className="flex items-start justify-between gap-12">
                    <label htmlFor="projectTitle" className="mb-2">
                      Projekttitel
                    </label>
                    <input
                      type="text"
                      placeholder="Wie lautet dein Projekt?"
                      className="input input-bordered w-full max-w-xs input-secondary"
                      id="projectTitle"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                    />
                  </div>
                  <div className="flex items-start justify-between gap-12">
                    <label htmlFor="projectDescription" className="mb-2">
                      Beschreibung
                    </label>
                    <textarea
                      rows="4"
                      cols="34"
                      placeholder="Beschreibe dein Projekt in kurzen Sätzen"
                      className="textarea textarea-secondary w-full  input-secondary max-w-sm"
                      id="projectDescription"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex items-start justify-between gap-12">
                    <label htmlFor="projectStarTime" className="mb-2">
                      Startdatum
                    </label>
                    <DatePicker
                      showTimeSelect
                      locale="de"
                      className=" input  input-bordered input-primary"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="Uhrzeit"
                      dateFormat="dd MMMM yyyy , h:mm aa"
                      placeholderText="23"
                      id="projectStarTime"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-12 ">
                    <label htmlFor="projectDescription" className="mb-2">
                      Enddatum
                    </label>
                    <DatePicker
                      className=" input input-bordered input-primary "
                      locale="de"
                      showTimeSelect
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="Uhrzeit"
                      dateFormat="dd MMMM yyyy , h:mm aa"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-12 ">
                    <label htmlFor="projectDescription" className="mb-2">
                      Farbe
                      <p
                        className="p-2 text-black "
                        style={{ backgroundColor: color }}
                      >
                        {color}
                      </p>
                    </label>
                    <div className="flex items-center justify-start ">
                      <PopoverPicker color={color} onChange={setColor} />
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-success">
                Projekt speichern
              </button>
            </form>
          </div>

          <div className="absolute top-5 right-5">
            <CircleButton
              onClick={onClose}
              icon={<IoClose className="text-4xl" />}
              btnColor={"btn-error"}
              tooltipColor={"tooltip-error"}
              tooltipPosition={"bottom"}
              tooltipText={"Schließen"}
            />
          </div>
          <div className="icon-grid overflow-auto">
            {icons.map((Icon, index) => (
              <button
                key={index}
                className={`btn ${
                  selectedIconIndex === index ? "btn-outline" : ""
                }`}
                onClick={() => selectIcon(index)}
              >
                <Icon />
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-4"></div>
          <div className="pagination flex justify-center gap-4 mt-4">
            <button
              className="btn btn-secondary"
              onClick={() => {
                handlePreviousPage();
                setSelectedIconIndex(-1);
              }}
              disabled={startIndex === 0}
            >
              Zurück
            </button>
            <div>
              {[...Array(Math.ceil(getAllIcons().length / iconsPerPage))].map(
                (_, index) => (
                  <input
                    key={index}
                    className="join-item btn btn-square"
                    type="radio"
                    name="options"
                    aria-label={index + 1}
                    checked={startIndex === index * iconsPerPage}
                    onChange={() => setStartIndex(index * iconsPerPage)}
                  />
                )
              )}
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => {
                handleNextPage();
                setSelectedIconIndex(+1);
              }}
              disabled={startIndex + iconsPerPage >= getAllIcons().length}
            >
              Weiter
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
