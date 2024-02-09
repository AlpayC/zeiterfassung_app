import CircleButton from "../buttons/CircleButton";
import { FaPlus } from "react-icons/fa";
import useModal from "../../../hooks/useModal";
import AddProjectModal from "../../../projectManagement/AddProjectModal";
export default function AddButton({ label }) {
  const { modalOpen, closeModal, openModal } = useModal();

  return (
    <div className="font-poppins-semibold btn-block justify-between items-center flex my-5">
      <p>{label}</p>

      <CircleButton
        onClick={openModal}
        icon={<FaPlus className="text-xs" />}
        btnColor={"btn-secondary"}
        tooltipColor={"tooltip-secondary"}
        tooltipPosition={"top"}
        tooltipText={"Projekt erstellen"}
        btnSize={"btn-sm"}
      />
      <AddProjectModal closeModal={closeModal} modalOpen={modalOpen} />
    </div>
  );
}
