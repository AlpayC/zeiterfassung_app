import { useEffect, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { IoClose } from "react-icons/io5";
import CircleButton from "../buttons/CircleButton";
import Kbd from "../kbd/Kbd";

export default function Modal({
  closeModal,
  modalOpen,
  children,
  shortcutOverlay,
}) {
  const modalRef = useRef();
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    const handleEscapePress = (event) => {
      if (event.keyCode === 27) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscapePress);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, [closeModal]);

  const kbdList = [
    {
      title: "Schließen",
      key: "esc",
    },
    {
      title: "Speichern",
      key: " ↵ ",
    },
  ];

  return (
    <>
      <dialog
        id="my_modal_2"
        className={`modal sm:modal-middle backdrop-blur-md 
          ${modalOpen === true ? "modal-open" : ""} `}
      >
        <div className="flex flex-row items-center justify-center w-full h-full relative">
          <section className="modal-box mb-36 !w-[91%] " ref={modalRef}>
            {children}
          </section>
          <Kbd keyList={kbdList} />
          {shortcutOverlay ? shortcutOverlay : <></>}

          <div className="mb-72">
            <CircleButton
              onClick={closeModal}
              icon={<IoClose className="text-4xl" />}
              btnColor={"btn-error"}
              tooltipColor={"tooltip-error"}
              tooltipPosition={"tooltip-bottom"}
              tooltipText={"Schließen"}
            />
          </div>
        </div>
      </dialog>
    </>
  );
}
